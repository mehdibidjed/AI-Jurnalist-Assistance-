from abc import ABC, abstractmethod
from typing import List


class IEmbeddingService(ABC):
    """
    Interface for embedding services.
    """

    @abstractmethod
    def init(self, model_name: str = "all-MiniLM-L6-v2") -> None:
        """
        Initialize the embedding model.

        Args:
            model_name (str): The name of the embedding model to load.
        """
        pass

    @abstractmethod
    def embed(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for a list of texts.

        Args:
            texts (List[str]): The list of text strings to embed.

        Returns:
            List[List[float]]: A list of embeddings corresponding to the input texts.
        """
        pass
