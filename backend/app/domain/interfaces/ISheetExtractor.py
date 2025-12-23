from abc import ABC, abstractmethod
from typing import List, Dict


class IArticleExtractor(ABC):
    """
    Interface for any article extractor/source.
    """

    @abstractmethod
    def extract_articles(self) -> List[Dict]:
        """
        Extracts articles from the data source.
        Returns a list of dictionaries with keys: title, content, published_date, url, source
        """
        pass
