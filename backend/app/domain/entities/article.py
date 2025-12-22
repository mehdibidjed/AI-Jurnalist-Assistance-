from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Article:
    """
    Article domain entity representing a news article.
    """
    title: str
    content: str
    url: str
    published_date: datetime
    source: str
