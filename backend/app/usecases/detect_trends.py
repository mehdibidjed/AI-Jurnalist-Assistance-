from backend.app.domain.value_object.retrieval_query import RetrievalQuery
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy
from backend.app.domain.entities.trend import Trend

class DetectTrendsUseCase:

    def __init__(self, retrieval_service, llm_service):
        self.retrieval_service = retrieval_service
        self.llm_service = llm_service

    def execute(self) -> list[Trend]:
        query = RetrievalQuery(
            text="Trending news topics in the last 48 hours",
            policy=RetrievalPolicy.trend_detection()
        )

        articles = self.retrieval_service.retrieve(query)

        trends = self.llm_service.detect_trends(articles)

        return trends