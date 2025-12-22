import logging
from typing import Dict, Optional
from datetime import datetime, timedelta
from urllib.parse import urlparse
from urllib import robotparser
import requests


logger = logging.getLogger(__name__)


class RobotsTxtCache:
    """
    Caches and parses robots.txt files per domain.
    Ensures compliance with website scraping policies.
    """
    
    def __init__(self, cache_duration_hours: int = 24):
        """
        Initialize cache.
        
        Args:
            cache_duration_hours: How long to cache robots.txt (default 24 hours)
        """
        self._cache: Dict[str, Dict] = {}
        self._cache_duration = timedelta(hours=cache_duration_hours)
    
    def can_fetch(self, url: str, user_agent: str) -> bool:
        """
        Check if user agent can fetch URL according to robots.txt.
        
        Args:
            url: URL to check
            user_agent: User agent string
            
        Returns:
            True if allowed, False if disallowed
        """
        try:
            domain = urlparse(url).netloc
            robots_parser = self._get_robots_parser(domain)
            
            if robots_parser is None:
                # If robots.txt not found or error, allow by default
                logger.warning(f"Could not fetch robots.txt for {domain}, allowing by default")
                return True
            if not policy.is_url_allowed(url):
                logger.debug(f"URL {url} not in allowed paths")
                return False
            can_fetch = robots_parser.can_fetch(user_agent, url)
            if not can_fetch:
                logger.info(f"robots.txt disallows {url} for {user_agent}")
            
            return can_fetch
            
        except Exception as e:
            logger.error(f"Error checking robots.txt for {url}: {str(e)}")
            # On error, be conservative and allow
            return True
    
    def _get_robots_parser(self, domain: str) -> Optional[robotparser.RobotFileParser]:
        """
        Get cached or fetch new robots.txt parser for domain.
        
        Args:
            domain: Domain to fetch robots.txt for
            
        Returns:
            RobotFileParser instance or None if unavailable
        """
        # Check cache
        if domain in self._cache:
            cache_entry = self._cache[domain]
            if datetime.now() - cache_entry['timestamp'] < self._cache_duration:
                return cache_entry['parser']
        
        # Fetch new robots.txt
        robots_url = f"https://{domain}/robots.txt"
        try:
            response = requests.get(robots_url, timeout=5)
            
            rp = robotparser.RobotFileParser()
            if response.status_code == 200:
                rp.parse(response.text.splitlines())
            else:
                # If 404 or other error, treat as "allow all"
                rp.parse([])
            
            # Cache the parser
            self._cache[domain] = {
                'parser': rp,
                'timestamp': datetime.now()
            }
            
            logger.info(f"Fetched and cached robots.txt for {domain}")
            return rp
            
        except Exception as e:
            logger.error(f"Failed to fetch robots.txt from {robots_url}: {str(e)}")
            return None
    
    def clear_cache(self):
        """Clear the entire cache"""
        self._cache.clear()
        logger.info("Cleared robots.txt cache")
