import logging
import time
import requests
from typing import List, Optional, Dict
from datetime import datetime
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import re

from backend.app.domain.interfaces.Iweb_scrapper import WebScraperInterface
from backend.app.domain.entities.source import Source
from backend.app.domain.value_object.scraping_policy import ScrapingPolicy
from backend.app.infrastructure.ingestion.robots_txt_cache import RobotsTxtCache


logger = logging.getLogger(__name__)


class WebScraper(WebScraperInterface):
    """
    Infrastructure implementation of web scraping.
    Uses requests + BeautifulSoup for ethical, controlled scraping.
    """
    
    def __init__(self, robots_cache: Optional[RobotsTxtCache] = None):
        """
        Initialize web scraper.
        
        Args:
            robots_cache: Optional RobotsTxtCache instance (creates one if not provided)
        """
        self.session = requests.Session()
        self.robots_cache = robots_cache or RobotsTxtCache()
        self.last_request_times: Dict[str, float] = {}  # domain -> timestamp
        self.consecutive_failures: Dict[str, int] = {}  # domain -> failure count
    
    def can_scrape(self, url: str, policy: ScrapingPolicy) -> bool:
        """
        Check if URL can be scraped according to robots.txt and policy.
        
        Args:
            url: URL to check
            policy: Scraping policy to enforce
            
        Returns:
            True if scraping is allowed, False otherwise
        """
        # Check policy allows this URL
       
        # Check robots.txt if policy requires it
        if policy.respect_robots_txt:
            return self.robots_cache.can_fetch(url, policy.user_agent)
        
        return True
    
    def discover_article_urls(self, source: Source) -> List[str]:
        """
        Discover article URLs from a source's landing page.
        
        Args:
            source: Source entity with scraping policy
            
        Returns:
            List of discovered article URLs (deduplicated)
        """
        if source.scraping_policy is None:
            logger.error(f"Source {source.name} has no scraping policy")
            return []
        
        policy = source.scraping_policy
        
        # Check if we can scrape this source
        if not self.can_scrape(source.url, policy):
            logger.warning(f"Cannot scrape {source.url} - disallowed by robots.txt or policy")
            return []
        
        # Enforce rate limiting
        self._enforce_rate_limit(policy.domain, policy)
        
        try:
            # Fetch landing page
            logger.info(f"Fetching landing page: {source.url}")
            response = self.session.get(
                source.url,
                headers={'User-Agent': policy.user_agent},
                timeout=policy.timeout_seconds
            )
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all links
            discovered_urls = set()
            for link in soup.find_all('a', href=True):
                href = link['href']
                
                # Convert relative URLs to absolute
                absolute_url = urljoin(source.url, href)
                
                # Check if URL matches allowed paths
                if policy.is_url_allowed(absolute_url):
                    discovered_urls.add(absolute_url)
                    
                    # Stop if we've reached max articles
                    if len(discovered_urls) >= policy.max_articles_per_session:
                        break
            
            discovered_list = list(discovered_urls)[:policy.max_articles_per_session]
            logger.info(f"Discovered {len(discovered_list)} article URLs from {source.url}")
            
            # Reset failure counter on success
            self.consecutive_failures[policy.domain] = 0
            
            return discovered_list
            
        except Exception as e:
            logger.error(f"Error discovering URLs from {source.url}: {str(e)}")
            self._increment_failure_count(policy.domain)
            return []
    
    def extract_article(self, url: str, policy: ScrapingPolicy) -> Optional[Dict[str, any]]:
        """
        Extract article content from URL.
        
        Args:
            url: Article URL to scrape
            policy: Scraping policy to enforce
            
        Returns:
            Dictionary with keys: title, content, published_date
            Returns None if extraction fails
        """
        # Check circuit breaker
        if self._is_circuit_broken(policy.domain):
            logger.error(f"Circuit breaker active for {policy.domain} - skipping")
            return None
        
        # Enforce rate limiting
        self._enforce_rate_limit(policy.domain, policy)
        
        try:
            # Fetch article page
            logger.info(f"Extracting article: {url}")
            response = self.session.get(
                url,
                headers={'User-Agent': policy.user_agent},
                timeout=policy.timeout_seconds
            )
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract title
            title = self._extract_title(soup)
            if not title:
                logger.warning(f"Could not extract title from {url}")
                self._increment_failure_count(policy.domain)
                return None
            
            # Extract content
            content = self._extract_content(soup, policy)
            if not content:
                logger.warning(f"Could not extract content from {url}")
                self._increment_failure_count(policy.domain)
                return None
            
            # Extract published date
            published_date = self._extract_published_date(soup)
            
            # Reset failure counter on success
            self.consecutive_failures[policy.domain] = 0
            
            return {
                'title': title,
                'content': content,
                'published_date': published_date
            }
            
        except Exception as e:
            logger.error(f"Error extracting article from {url}: {str(e)}")
            self._increment_failure_count(policy.domain)
            return None
    
    def _extract_title(self, soup: BeautifulSoup) -> Optional[str]:
        """
        Extract article title using multiple strategies.
        
        Args:
            soup: BeautifulSoup parsed HTML
            
        Returns:
            Extracted title or None
        """
        # Strategy 1: Open Graph meta tag
        og_title = soup.find('meta', property='og:title')
        if og_title and og_title.get('content'):
            return og_title['content'].strip()
        
        # Strategy 2: <h1> tag
        h1 = soup.find('h1')
        if h1:
            return h1.get_text().strip()
        
        # Strategy 3: <title> tag
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()
        
        return None
    
    def _extract_content(self, soup: BeautifulSoup, policy: ScrapingPolicy) -> Optional[str]:
        """
        Extract article content using semantic HTML and heuristics.
        
        Args:
            soup: BeautifulSoup parsed HTML
            policy: Scraping policy for length limits
            
        Returns:
            Extracted content or None
        """
        content_text = ""
        
        # Strategy 1: Semantic HTML5 <article> tag
        article_tag = soup.find('article')
        if article_tag:
            # Remove unwanted elements
            for tag in article_tag.find_all(['script', 'style', 'nav', 'aside', 'footer']):
                tag.decompose()
            content_text = article_tag.get_text(separator='\n', strip=True)
        
        # Strategy 2: Common CSS classes for article content
        if not content_text:
            content_selectors = [
                'article-body', 'article-content', 'story-body', 
                'post-content', 'entry-content', 'article__body'
            ]
            for selector in content_selectors:
                content_div = soup.find('div', class_=re.compile(selector))
                if content_div:
                    for tag in content_div.find_all(['script', 'style', 'nav', 'aside']):
                        tag.decompose()
                    content_text = content_div.get_text(separator='\n', strip=True)
                    break
        
        # Strategy 3: Longest text block heuristic
        if not content_text:
            paragraphs = soup.find_all('p')
            if paragraphs:
                # Concatenate all paragraphs
                content_text = '\n'.join([p.get_text(strip=True) for p in paragraphs])
        
        # Clean and validate content
        if content_text:
            # Remove excessive whitespace
            content_text = re.sub(r'\n\s*\n', '\n\n', content_text)
            content_text = content_text.strip()
            
            # Validate length
            if len(content_text) < policy.min_content_length:
                logger.debug(f"Content too short: {len(content_text)} chars")
                return None
            
            # Truncate if too long
            if len(content_text) > policy.max_content_length:
                content_text = content_text[:policy.max_content_length] + "..."
            
            return content_text
        
        return None
    
    def _extract_published_date(self, soup: BeautifulSoup) -> Optional[datetime]:
        """
        Extract published date using multiple strategies.
        
        Args:
            soup: BeautifulSoup parsed HTML
            
        Returns:
            datetime object or None
        """
        # Strategy 1: Open Graph article:published_time
        og_date = soup.find('meta', property='article:published_time')
        if og_date and og_date.get('content'):
            try:
                return datetime.fromisoformat(og_date['content'].replace('Z', '+00:00'))
            except Exception:
                pass
        
        # Strategy 2: <time> tag with datetime attribute
        time_tag = soup.find('time', datetime=True)
        if time_tag:
            try:
                return datetime.fromisoformat(time_tag['datetime'].replace('Z', '+00:00'))
            except Exception:
                pass
        
        # Strategy 3: JSON-LD structured data
        json_ld = soup.find('script', type='application/ld+json')
        if json_ld:
            try:
                import json
                data = json.loads(json_ld.string)
                if 'datePublished' in data:
                    return datetime.fromisoformat(data['datePublished'].replace('Z', '+00:00'))
            except Exception:
                pass
        
        # Fallback: Use current time
        return datetime.now()
    
    def _enforce_rate_limit(self, domain: str, policy: ScrapingPolicy):
        """
        Ensure minimum delay between requests to same domain.
        
        Args:
            domain: Domain being scraped
            policy: Scraping policy with rate limit
        """
        last_request = self.last_request_times.get(domain)
        if last_request:
            elapsed = time.time() - last_request
            if elapsed < policy.rate_limit_seconds:
                sleep_time = policy.rate_limit_seconds - elapsed
                logger.debug(f"Rate limiting: sleeping {sleep_time:.2f}s for {domain}")
                time.sleep(sleep_time)
        
        self.last_request_times[domain] = time.time()
    
    def _increment_failure_count(self, domain: str):
        """Increment consecutive failure counter for domain"""
        self.consecutive_failures[domain] = self.consecutive_failures.get(domain, 0) + 1
    
    def _is_circuit_broken(self, domain: str) -> bool:
        """
        Check if circuit breaker is active for domain.
        
        Args:
            domain: Domain to check
            
        Returns:
            True if circuit breaker is active (too many failures)
        """
        return self.consecutive_failures.get(domain, 0) >= 5

