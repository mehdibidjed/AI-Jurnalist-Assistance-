import pytest
from backend.app.infrastructure.ai.embeddings import EmbeddingService
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository
from backend.app.infrastructure.ai.retrieval_service import PineconeRetrievalService
from backend.app.infrastructure.ai.llm import GeminiLLMService
from backend.app.usecases.detect_trends import DetectTrendsUseCase

@pytest.mark.integration
def test_detect_trends_integration():
    """
    Integration test for DetectTrendsUseCase.
    Make sure your Pinecone index has some articles indexed before running.
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
    llm_service = GeminiLLMService(
        model_name="gemini-2.5-flash-preview-09-2025"
    )

    # -------------------------
    # Initialize use case
    # -------------------------
    use_case = DetectTrendsUseCase(
        retrieval_service=retrieval_service,
        llm_service=llm_service
    )

    # -------------------------
    # Execute
    # -------------------------
    trends = use_case.execute()

    # -------------------------
    # Assertions
    # -------------------------
    assert isinstance(trends, list)
    assert all(hasattr(t, "topic") for t in trends)
    assert all(hasattr(t, "description") for t in trends)
    assert all(hasattr(t, "confidence_score") for t in trends)

    # Optional: print trends for manual inspection
    for t in trends:
        print(f"{t.topic} ({t.confidence_score}%): {t.description}")

# Run test directly if needed
if __name__ == "__main__":
    test_detect_trends_integration()
