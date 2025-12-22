# app/infrastructure/ingestion/rss_collector.py

"""
RSS Collector Module

This module implements the RSS feed collection functionality following clean architecture principles.
It collects articles from RSS feeds, converts them to domain entities, and stores them via repository.
"""

import logging
from typing import List, Optional
from datetime import datetime
from urllib.parse import urlparse

import feedparser
from feedparser import FeedParserDict

from backend.app.domain.entities.article import Article
from backend.app.domain.interfaces.Iarticle_repository import ArticleRepository


# Configure logging for the collector
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RSSCollector:
    """
    RSS Collector that fetches articles from RSS feeds and stores them in the repository.
    
    This class follows clean architecture by depending on the repository interface
    rather than concrete database implementations.
    """
    
    def __init__(self, repository: ArticleRepository):
        """
        Initialize the RSS Collector with dependency injection.
        
        Args:
            repository: An implementation of ArticleRepository interface for data persistence
        """
        self.repository = repository
        logger.info("RSSCollector initialized with repository")
    
    def collect_feeds(self, feed_urls: List[str]) -> dict:
        """
        Collect articles from multiple RSS feed URLs.
        
        Args:
            feed_urls: List of RSS feed URLs to collect from
            
        Returns:
            Dictionary with collection statistics (total, new, skipped, errors)
        """
        stats = {
            'total_processed': 0,
            'new_articles': 0,
            'duplicates_skipped': 0,
            'invalid_skipped': 0,
            'errors': 0
        }
        
        logger.info(f"Starting collection from {len(feed_urls)} RSS feeds")
        
        for feed_url in feed_urls:
            try:
                feed_stats = self._collect_single_feed(feed_url)
                # Aggregate statistics
                for key in stats:
                    stats[key] += feed_stats[key]
            except Exception as e:
                logger.error(f"Error collecting feed {feed_url}: {str(e)}")
                stats['errors'] += 1
        
        logger.info(f"Collection complete. Stats: {stats}")
        return stats
    
    def _collect_single_feed(self, feed_url: str) -> dict:
        """
        Collect articles from a single RSS feed.
        
        Args:
            feed_url: URL of the RSS feed to collect
            
        Returns:
            Dictionary with collection statistics for this feed
        """
        stats = {
            'total_processed': 0,
            'new_articles': 0,
            'duplicates_skipped': 0,
            'invalid_skipped': 0,
            'errors': 0
        }
        
        logger.info(f"Fetching feed: {feed_url}")
        
        # Parse the RSS feed using feedparser
        feed = feedparser.parse(feed_url)
        
        # Check if feed was parsed successfully
        if feed.bozo and not feed.entries:
            logger.error(f"Failed to parse feed {feed_url}: {feed.bozo_exception}")
            stats['errors'] += 1
            return stats
        
        # Extract source name from feed metadata or URL
        source_name = self._extract_source_name(feed, feed_url)
        
        # Process each entry in the feed
        for entry in feed.entries:
            stats['total_processed'] += 1
            
            try:
                # Convert RSS entry to Article domain entity
                article = self._entry_to_article(entry, source_name)
                
                # Validate the article
                if not self._is_valid_article(article):
                    logger.debug(f"Skipping invalid article: {article.title if article else 'None'}")
                    stats['invalid_skipped'] += 1
                    continue
                
                # Check for duplicates using repository
                if self._is_duplicate(article):
                    logger.debug(f"Skipping duplicate article: {article.title}")
                    stats['duplicates_skipped'] += 1
                    continue
                
                # Save article through repository interface
                self.repository.save(article)
                stats['new_articles'] += 1
                logger.info(f"Saved new article: {article.title}")
                
            except Exception as e:
                logger.error(f"Error processing entry: {str(e)}")
                stats['errors'] += 1
        
        return stats
    
    def _entry_to_article(self, entry: FeedParserDict, source_name: str) -> Optional[Article]:
        """
        Convert an RSS feed entry to an Article domain entity.
        
        Args:
            entry: Parsed RSS feed entry from feedparser
            source_name: Name of the source feed
            
        Returns:
            Article entity or None if conversion fails
        """
        try:
            # Extract title
            title = entry.get('title', '').strip()
            
            # Extract content - try multiple fields as RSS feeds vary
            content = self._extract_content(entry)
            
            # Extract URL/link
            url = entry.get('link', '').strip()
            
            # Extract published date
            published_date = self._extract_published_date(entry)
            
            # Create Article entity
            article = Article(
                title=title,
                content=content,
                url=url,
                published_date=published_date,
                source=source_name
            )
            
            return article
            
        except Exception as e:
            logger.error(f"Error converting entry to article: {str(e)}")
            return None
    
    def _extract_content(self, entry: FeedParserDict) -> str:
        """
        Extract content from RSS entry, trying multiple possible fields.
        
        Args:
            entry: Parsed RSS feed entry
            
        Returns:
            Extracted content string
        """
        # Try content field (Atom feeds)
        if 'content' in entry and len(entry.content) > 0:
            return entry.content[0].get('value', '').strip()
        
        # Try summary field (RSS feeds)
        if 'summary' in entry:
            return entry.summary.strip()
        
        # Try description field
        if 'description' in entry:
            return entry.description.strip()
        
        return ''
    
    def _extract_published_date(self, entry: FeedParserDict) -> Optional[datetime]:
        """
        Extract and parse published date from RSS entry.
        
        Args:
            entry: Parsed RSS feed entry
            
        Returns:
            datetime object or None if not available
        """
        # Try published_parsed (standard field from feedparser)
        if hasattr(entry, 'published_parsed') and entry.published_parsed:
            try:
                return datetime(*entry.published_parsed[:6])
            except (TypeError, ValueError):
                pass
        
        # Try updated_parsed as fallback
        if hasattr(entry, 'updated_parsed') and entry.updated_parsed:
            try:
                return datetime(*entry.updated_parsed[:6])
            except (TypeError, ValueError):
                pass
        
        # If no date available, use current time
        return datetime.now()
    
    def _extract_source_name(self, feed: FeedParserDict, feed_url: str) -> str:
        """
        Extract source name from feed metadata or derive from URL.
        
        Args:
            feed: Parsed RSS feed
            feed_url: URL of the feed
            
        Returns:
            Source name string
        """
        # Try feed title first
        if hasattr(feed, 'feed') and hasattr(feed.feed, 'title'):
            return feed.feed.title.strip()
        
        # Fallback to domain name from URL
        try:
            domain = urlparse(feed_url).netloc
            # Remove 'www.' prefix if present
            if domain.startswith('www.'):
                domain = domain[4:]
            return domain
        except Exception:
            return 'Unknown Source'
    
    def _is_valid_article(self, article: Optional[Article]) -> bool:
        """
        Validate article has required fields and is not empty.
        
        Args:
            article: Article entity to validate
            
        Returns:
            True if article is valid, False otherwise
        """
        if article is None:
            return False
        
        # Check title is not empty
        if not article.title or len(article.title.strip()) == 0:
            return False
        
        # Check content is not empty
        if not article.content or len(article.content.strip()) == 0:
            return False
        
        # Check URL is not empty
        if not article.url or len(article.url.strip()) == 0:
            return False
        
        # Optional: Add more validation rules here
        # e.g., minimum content length, URL format validation, etc.
        
        return True
    
    def _is_duplicate(self, article: Article) -> bool:
        """
        Check if article already exists in repository based on URL or title.
        
        Args:
            article: Article entity to check
            
        Returns:
            True if duplicate exists, False otherwise
        """
        try:
            # Check by URL first (most reliable)
            existing_by_url = self.repository.find_by_url(article.url)
            if existing_by_url:
                return True
            
            # Check by title as fallback (same article might have different URLs)
            existing_by_title = self.repository.find_by_title(article.title)
            if existing_by_title:
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error checking for duplicates: {str(e)}")
            # On error, assume not duplicate to avoid losing articles
            return False


# Example usage and integration demonstration
if __name__ == "__main__":
    """
    Example usage of RSSCollector with dependency injection.
    
    In a real application, this would be called from a use case like ingest_news.py
    """
    
    # Mock repository for demonstration (in real app, inject the actual implementation)
    class MockArticleRepository:
        def save(self, article):
            print(f"Saving article: {article.title}")
        
        def find_by_url(self, url):
            return None  # Simulate no duplicates
        
        def find_by_title(self, title):
            return None  # Simulate no duplicates
    
    # Initialize collector with dependency injection
    mock_repo = MockArticleRepository()
    collector = RSSCollector(repository=mock_repo)
    
    # Example RSS feeds to collect from
    feed_urls = [
        "http://rss.cnn.com/rss/edition.rss",
        "https://feeds.bbci.co.uk/news/rss.xml",
        "https://www.theguardian.com/world/rss",
    ]
    
    # Collect articles from all feeds
    results = collector.collect_feeds(feed_urls)
    
    # Display results
    print("\n=== Collection Results ===")
    print(f"Total processed: {results['total_processed']}")
    print(f"New articles saved: {results['new_articles']}")
    print(f"Duplicates skipped: {results['duplicates_skipped']}")
    print(f"Invalid entries skipped: {results['invalid_skipped']}")
    print(f"Errors encountered: {results['errors']}")