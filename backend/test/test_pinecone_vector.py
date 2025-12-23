import pytest
from unittest.mock import MagicMock, patch
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository

@patch("backend.app.infrastructure.db.pinecone_vector_repo.Pinecone")
def test_pinecone_vector_repository_add_and_search(mock_pinecone):
    mock_pc = MagicMock()
    mock_index = MagicMock()

    mock_pinecone.return_value = mock_pc
    mock_pc.list_indexes.return_value.names.return_value = ["articles"]
    mock_pc.Index.return_value = mock_index

    repo = PineconeVectorRepository(dimension=384)

    ids = ["1"]
    vectors = [[0.1, 0.2]]
    metadatas = [{"title": "Test"}]

    repo.add(ids, vectors, metadatas)

    mock_index.upsert.assert_called_once()

    mock_index.query.return_value = {
        "matches": [{"metadata": {"title": "Test"}}]
    }

    result = repo.search([0.1, 0.2], top_k=1)

    assert result == [{"title": "Test"}]
