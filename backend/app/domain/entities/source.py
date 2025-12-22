from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from enum import Enum


class SourceType(Enum):
    """Type of news source"""
    RSS = "rss"
    WEB_SCRAPE = "web_scrape"


@dataclass
class Source:
    """
    Represents a news source - supports both RSS and web scraping.
    """
    name: str
    type: SourceType
    url: str  # RSS feed URL or base domain URL
    is_active: bool = True
    id: Optional[str] = None
    scraping_policy: Optional['ScrapingPolicy'] = None  # Only for WEB_SCRAPE type
    last_collected: Optional[datetime] = None
    created_at: Optional[datetime] = None
    
    def __post_init__(self):
        """Validate source configuration"""
        if self.type == SourceType.WEB_SCRAPE and self.scraping_policy is None:
            raise ValueError("Web scrape sources must have a scraping policy")
        if self.created_at is None:
            self.created_at = datetime.now()
