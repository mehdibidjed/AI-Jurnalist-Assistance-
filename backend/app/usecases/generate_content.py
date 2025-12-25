from backend.app.domain.value_object.retrieval_query import RetrievalQuery
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy

class GenerateContentUseCase:

    def __init__(self, retrieval_service, llm_service):
        self.retrieval_service = retrieval_service
        self.llm_service = llm_service

    def execute(self, topic: str):
        query = RetrievalQuery(
            text=topic,
            policy=RetrievalPolicy.article_generation()
        )

        context_articles = self.retrieval_service.retrieve(query)

        return self.llm_service.generate_article(
            topic=topic,
            context=context_articles
        )

