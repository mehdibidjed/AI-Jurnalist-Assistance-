from dataclasses import dataclass
from typing import List
from urllib.parse import urlparse


@dataclass(frozen=True)
class ScrapingPolicy:
    """
    Immutable value object that defines scraping rules for a specific domain.
    Ensures controlled and ethical web scraping.
    """
    domain: str  # e.g., "bbc.com"
    allowed_paths: List[str]  # e.g., ["/news/", "/world/"]
    rate_limit_seconds: int  # Minimum delay between requests
    respect_robots_txt: bool = True
    max_articles_per_session: int = 60
    user_agent: str = "NewsAggregator/1.0 (Educational; +contact@example.com)"
    timeout_seconds: int = 10
    max_content_length: int = 100000  # Maximum article content length in characters
    min_content_length: int = 100    # Minimum article content length in characters
    
    def __post_init__(self):
        """Validate policy parameters"""
        if self.rate_limit_seconds < 1:
            raise ValueError("Rate limit must be at least 1 second")
        if self.max_articles_per_session < 1:
            raise ValueError("Max articles must be at least 1")
        if not self.domain:
            raise ValueError("Domain cannot be empty")
    
    def is_url_allowed(self, url: str) -> bool:
        """
        Check if URL matches allowed paths.
        
        Args:
            url: Full URL to validate
            
        Returns:
            True if URL is within allowed paths, False otherwise
        """
        try:
            parsed = urlparse(url)
            # Check domain matches
            if parsed.netloc != self.domain and not parsed.netloc.endswith(f".{self.domain}"):
                return False
            # Check path matches any allowed path
            return any(parsed.path.startswith(path) for path in self.allowed_paths)
        except Exception:
            return False
