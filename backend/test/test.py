from backend.app.domain.interfaces.Iembedding_service import IEmbeddingService
from backend.app.domain.interfaces.Ivector_repository import IVectorRepository
from backend.app.domain.interfaces.Illm_service import ILlmService
from backend.app.infrastructure.ai.embeddings import EmbeddingService
from backend.app.infrastructure.ai.llm import GeminiLLMService
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository

class AnswerQuestionUseCase:
    def __init__(
        self,
        embedding_service: IEmbeddingService,
        vector_repo: IVectorRepository,
        llm_service: ILlmService,
    ):
        self.embedding_service = embedding_service
        self.vector_repo = vector_repo
        self.llm_service = llm_service

    def execute(self, question: str) -> str:
        # 1. Embed the question
        query_vector = self.embedding_service.embed(question)

        # 2. Retrieve relevant chunks
        chunks = self.vector_repo.search(
            query_vector=query_vector,
            top_k=5
        )
        print(chunks)
        context_texts = [
            match["metadata"]
            for match in chunks
        ]
        # 3. Generate answer using LLM
        return self.llm_service.generate(
            prompt=question,
            context=context_texts
        )

def get_answer_question_usecase():
    r= AnswerQuestionUseCase(
        embedding_service=EmbeddingService(),
        vector_repo=PineconeVectorRepository(),
        llm_service=GeminiLLMService(),
    )
    return r.execute("what  are the lastnews")

print(get_answer_question_usecase())