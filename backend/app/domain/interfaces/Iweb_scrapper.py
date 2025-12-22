from abc import ABC, abstractmethod
from typing import List, Optional, Dict
from backend.app.domain.entities.source import Source
from backend.app.domain.value_object.scraping_policy import ScrapingPolicy


class WebScraperInterface(ABC):
    """
    Interface for web scraping infrastructure.
    Defines the contract between application and infrastructure layers.
    """
    
    @abstractmethod
    def can_scrape(self, url: str, policy: ScrapingPolicy) -> bool:
        """
        Check if URL can be scraped according to robots.txt and policy.
        
        Args:
            url: URL to check
            policy: Scraping policy to enforce
            
        Returns:
            True if scraping is allowed, False otherwise
        """
        pass
    
    @abstractmethod
    def discover_article_urls(self, source: Source) -> List[str]:
        """
        Discover article URLs from a source's landing page.
        
        Args:
            source: Source entity with scraping policy
            
        Returns:
            List of discovered article URLs
        """
        pass
    
    @abstractmethod
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
        pass

