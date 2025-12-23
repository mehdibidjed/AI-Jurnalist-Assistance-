import pytest
from backend.app.infrastructure.ai.embeddings import EmbeddingService


def test_embedding_service_embed():
    service = EmbeddingService()
    service.init(model_name="all-MiniLM-L6-v2")  # initialize model

    texts = ["Hello world", "AI is amazing"]
    embeddings = service.embed(texts)

    # Check output type
    assert isinstance(embeddings, list)
    assert all(isinstance(vec, list) for vec in embeddings)

    # Check dimensions
    assert len(embeddings) == len(texts)
    assert len(embeddings[0]) > 0
