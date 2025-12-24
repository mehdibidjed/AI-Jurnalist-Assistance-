from abc import ABC, abstractmethod
from typing import List

class ILlmService(ABC):

    @abstractmethod
    def generate(
        self,
        prompt: str,
        context: List[str]
    ) -> str:
        pass