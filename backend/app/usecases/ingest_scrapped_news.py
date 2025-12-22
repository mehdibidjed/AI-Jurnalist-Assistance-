import logging
from typing import Dict
from datetime import datetime, timedelta, timezone

from backend.app.domain.entities.article import Article
from backend.app.domain.entities.source import SourceType
from backend.app.domain.interfaces.Iarticle_repository import ArticleRepository
from backend.app.domain.interfaces.source_repository import SourceRepository
from backend.app.domain.interfaces.Iweb_scrapper import WebScraperInterface


logger = logging.getLogger(__name__)

class IngestScrapedNewsUseCase:
    """
    Use case for ingesting news from web scraping sources.
    Follows clean architecture with dependency injection.
    """
    
    def __init__(
        self,
        article_repository: ArticleRepository,
        source_repository: SourceRepository,
        web_scraper: WebScraperInterface,
        max_days_old: int = 30
    ):
        """
        Initialize use case with dependencies.
        
        Args:
            article_repository: Repository for article persistence
            source_repository: Repository for source management
            web_scraper: Web scraping infrastructure implementation
            max_days_old: Maximum age of articles to accept (days)
        """
        self.article_repo = article_repository
        self.source_repo = source_repository
        self.scraper = web_scraper
        self.max_days_old = max_days_old
    
    def execute(self) -> Dict[str, int]:
        """
        Execute the scraped news ingestion process.
        
        Returns:
            Dictionary with ingestion statistics
        """
        stats = {
            'sources_processed': 0,
            'urls_discovered': 0,
            'articles_scraped': 0,
            'articles_saved': 0,
            'duplicates_skipped': 0,
            'invalid_skipped': 0,
            'errors': 0
        }
        
        logger.info("Starting scraped news ingestion")
        
        # Step 1: Retrieve active scraping sources
        sources = self.source_repo.find_by_type(SourceType.WEB_SCRAPE, active_only=True)
        logger.info(f"Found {len(sources)} active web scraping sources")
        
        # Step 2: Process each source
        for source in sources:
            try:
                source_stats = self._process_source(source)
                
                # Aggregate statistics
                for key in source_stats:
                    if key in stats:
                        stats[key] += source_stats[key]
                
                stats['sources_processed'] += 1
                
                # Update source timestamp
                source.last_collected = datetime.now()
                self.source_repo.update(source)
                
            except Exception as e:
                logger.error(f"Error processing source {source.name}: {str(e)}")
                stats['errors'] += 1
        
        logger.info(f"Scraping complete. Stats: {stats}")
        return stats
    
    def _process_source(self, source) -> Dict[str, int]:
        """
        Process a single scraping source.
        
        Args:
            source: Source entity to process
            
        Returns:
            Statistics for this source
        """
        stats = {
            'urls_discovered': 0,
            'articles_scraped': 0,
            'articles_saved': 0,
            'duplicates_skipped': 0,
            '   ': 0,
            'errors': 0
        }
        
        logger.info(f"Processing source: {source.name}")
        
        # Validate source has scraping policy
        if source.scraping_policy is None:
            logger.error(f"Source {source.name} has no scraping policy")
            stats['errors'] += 1
            return stats
        
        # Step 3: Discover article URLs
        article_urls = self.scraper.discover_article_urls(source)
        stats['urls_discovered'] = len(article_urls)
        logger.info(f"Discovered {len(article_urls)} URLs from {source.name}")
        
        # Step 4: Extract and save each article
        for url in article_urls:
            try:
                # Check for duplicate BEFORE scraping (save bandwidth)
                if self.article_repo.exists_by_url(url):
                    logger.debug(f"Skipping duplicate URL: {url}")
                    stats['duplicates_skipped'] += 1
                    continue
                
                # Extract article content
                article_data = self.scraper.extract_article(url, source.scraping_policy)
                stats['articles_scraped'] += 1
                
                if article_data is None:
                    logger.debug(f"Failed to extract article from {url}")
                    stats['invalid_skipped'] += 1
                    continue
                published_date = article_data.get('published_date')

                if published_date:
                    if published_date.tzinfo is None:
                        published_date = published_date.replace(tzinfo=timezone.utc)
                    else:
                        published_date = published_date.astimezone(timezone.utc)
                # Convert to domain entity
                article = Article(
                    title=article_data['title'],
                    content=article_data['content'],
                    url=url,
                    published_date=published_date,
                    source=source.name
                )
                
                # Validate article
                if not self._is_valid_article(article):
                    logger.debug(f"Article validation failed: {article.title}")
                    stats['invalid_skipped'] += 1
                    continue
                
                # Check for duplicates (title and content hash)
                if self._is_duplicate(article):
                    logger.debug(f"Skipping duplicate article: {article.title}")
                    stats['duplicates_skipped'] += 1
                    continue
                
                # Save article
                self.article_repo.save(article)
                stats['articles_saved'] += 1
                logger.info(f"Saved article: {article.title}")
                
            except Exception as e:
                logger.error(f"Error processing URL {url}: {str(e)}")
                stats['errors'] += 1
        
        return stats
    
    def _is_valid_article(self, article: Article) -> bool:
        """
        Validate article meets quality standards.
        
        Args:
            article: Article to validate
            
        Returns:
            True if valid, False otherwise
        """
        # Check title length
        if not article.title or len(article.title.strip()) < 5:
            return False
        if len(article.title) > 500:
            return False
        
        # Check content length
        if not article.content or len(article.content.strip()) < 100:
            return False
        if len(article.content) > 50000:
            return False
        
        # Check URL is HTTPS
        if not article.url.startswith('https://'):
            logger.warning(f"Non-HTTPS URL: {article.url}")
            # Allow but log warning
        
        # Check published date is recent
        if article.published_date:
            now_utc = datetime.now(timezone.utc)  # aware datetime
            age = now_utc - article.published_date
            if age.days > self.max_days_old:
                logger.debug(f"Article too old: {age.days} days")
                return False
        
        return True
    
    def _is_duplicate(self, article: Article) -> bool:
        """
        Check for duplicate articles using multiple strategies.
        
        Args:
            article: Article to check
            
        Returns:
            True if duplicate exists, False otherwise
        """
        try:
            # Check by URL (should already be done, but double-check)
            if self.article_repo.find_by_url(article.url):
                return True
            
            # Check by content hash (exact content match)
            if self.article_repo.find_by_content_hash(article.content_hash):
                return True
            
            # Check by fuzzy title match (cross-source duplicates)
            if self.article_repo.find_by_title_fuzzy(article.title, threshold=0.85):
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error checking for duplicates: {str(e)}")
            # On error, assume not duplicate to avoid losing articles
            return False
