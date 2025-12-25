import pytest
from backend.app.usecases.fact_check import FactCheckUseCase
from backend.app.infrastructure.ai.llm import GeminiLLMService
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository
from backend.app.infrastructure.ai.embeddings import EmbeddingService
from backend.app.infrastructure.ai.retrieval_service  import PineconeRetrievalService
from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy
from backend.app.domain.value_object.retrieval_query import RetrievalQuery

@pytest.mark.integration
def test_fact_check_integration():
    """
    Integration test for FactCheckUseCase using real Pinecone + Gemini.
    Make sure the Pinecone index has some articles indexed before running.
    """

    # -------------------------
    # Initialize services
    # -------------------------
    embedding_service = EmbeddingService()
    vector_repo = PineconeVectorRepository()
    retrieval_service = PineconeRetrievalService(
        vector_repo=vector_repo,
        embedding_service=embedding_service
    )
    llm_service = GeminiLLMService()

    use_case = FactCheckUseCase(
        retrieval_service=retrieval_service,
        llm_service=llm_service
    )

    # -------------------------
    # Test article
    # -------------------------
    article_text = "The Earth is flat and supported by turtles."

    result = use_case.execute(article_text)

    # -------------------------
    # Assertions
    # -------------------------
    # Ensure LLM returns a dictionary
    print("Integration test result:", result)
    assert isinstance(result, dict)
    assert "class" in result
    assert "accuracy_score" in result

test_fact_check_integration()