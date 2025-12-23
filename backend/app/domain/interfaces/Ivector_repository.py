from abc import ABC, abstractmethod
from typing import List, Dict

class IVectorRepository(ABC):

    @abstractmethod
    def add(
        self,
        ids: List[str],
        vectors: List[List[float]],
        metadatas: List[Dict]
    ) -> None:
        pass

    @abstractmethod
    def search(
        self,
        query_vector: List[float],
        top_k: int
    ) -> List[Dict]:
        pass