from abc import ABC, abstractmethod
from typing import Optional
from backend.app.domain.entities.article import Article

class ArticleRepository(ABC):
    """
    Abstract interface for article repository.
    Defines the contract for saving and querying articles.
    """
    def exists_by_url(self, url: str) -> bool:
        pass
    @abstractmethod
    def save(self, article: Article) -> None:
        """
        Save a new article to the repository.
        """
        pass

    @abstractmethod
    def find_by_url(self, url: str) -> Optional[Article]:
        """
        Find an article by its URL.
        Return the Article if found, otherwise None.
        """
        pass

    @abstractmethod
    def find_by_title(self, title: str) -> Optional[Article]:
        """
        Find an article by its title.
        Return the Article if found, otherwise None.
        """
        pass
