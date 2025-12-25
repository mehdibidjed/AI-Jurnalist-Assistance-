from backend.app.domain.value_object.retrieval_query import RetrievalQuery
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy

class FactCheckUseCase:

    def __init__(self, retrieval_service, llm_service):
        self.retrieval_service = retrieval_service
        self.llm_service = llm_service

    def execute(self, article_text: str):
        query = RetrievalQuery(
            text=article_text,
            policy=RetrievalPolicy.fact_checking()
        )

        evidence = self.retrieval_service.retrieve(query)
        print(self.llm_service)
        return self.llm_service.evaluate_article(
            article_text=article_text,
            sources=evidence
        )