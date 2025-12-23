from abc import ABC, abstractmethod
from typing import List

class IArticleChunker(ABC):

    @abstractmethod
    def split(self, text: str) -> List[str]:
        """Split article into semantically coherent chunks"""
        pass
