from abc import ABC, abstractmethod
from typing import List
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy

class IRetrievalService(ABC):

    @abstractmethod
    def retrieve(
        self,
        query: str,
        policy: RetrievalPolicy
    ) -> List[str]:
        pass