# app/use_cases/ingest_news.py

from typing import List
from app.infrastructure.ingestion.rss_collector import RSSCollector
from backend.app.domain.interfaces.Iarticle_repository import ArticleRepository


class IngestNewsUseCase:
    """
    Use case for ingesting news articles from RSS feeds.
    """
    
    def __init__(self, article_repository: ArticleRepository):
        """
        Initialize use case with repository dependency.
        
        Args:
            article_repository: Repository implementation for article persistence
        """
        self.collector = RSSCollector(repository=article_repository)
    
    def execute(self, feed_urls: List[str]) -> dict:
        """
        Execute the news ingestion process.
        
        Args:
            feed_urls: List of RSS feed URLs to ingest from
            
        Returns:
            Dictionary with ingestion statistics
        """
        return self.collector.collect_feeds(feed_urls)


# Usage from API or CLI
def ingest_news_from_feeds(repository_instance, feed_list):
    """
    Example function showing how to call the use case.
    """
    use_case = IngestNewsUseCase(article_repository=repository_instance)
    stats = use_case.execute(feed_urls=feed_list)
    return stats