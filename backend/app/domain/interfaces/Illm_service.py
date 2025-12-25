from abc import ABC, abstractmethod
from typing import List, Dict

from backend.app.domain.entities.trend import Trend


class ILlmService(ABC):

    @abstractmethod
    def generate(
        self,
        prompt: str,
        context: List[str]
    ) -> str:
        pass

    @abstractmethod
    def detect_trends(self, articles: List[str]) -> List[Trend]:
        pass

    @abstractmethod
    def evaluate_article(self, article_text: str, sources: List[str]) -> Dict:
        pass

    @abstractmethod
    def generate_article(self, topic: str, context: List[str]) -> str:
        pass

    @abstractmethod
    def generate_article(self, topic: str)->str:
        pass