from backend.app.domain.value_object.retrieval_query import RetrievalQuery
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy

class GenerateContentChatBotUseCase:

    def __init__(self, llm_service):

        self.llm_service = llm_service

    def execute(self, topic: str):
        return self.llm_service.generate_article(
            topic=topic,
        )

