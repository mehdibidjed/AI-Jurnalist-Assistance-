import pytest
from unittest.mock import MagicMock
from backend.app.infrastructure.db.chroma_vector_repo  import ChromaVectorRepository

def test_chroma_vector_repository_add_and_search():
    repo = ChromaVectorRepository(collection_name="test_articles")

    # Mock the Chroma client and collection
    mock_collection = MagicMock()
    repo.client = MagicMock()
    repo.client.get_or_create_collection.return_value = mock_collection
    repo.collection = mock_collection



    # Add sample data
    ids = ["1", "2"]
    vectors = [[0.1, 0.2], [0.3, 0.4]]
    metadatas = [{"title": "A"}, {"title": "B"}]
    repo.add(ids, vectors, metadatas)

    # Ensure collection.add was called with correct arguments
    mock_collection.add.assert_called_once_with(ids=ids, embeddings=vectors, metadatas=metadatas)

    # Mock search return value
    mock_collection.query.return_value = {"metadatas": [[{"title": "A"}]]}

    results = repo.search([0.1, 0.2], top_k=1)
    result = repo.search([0.1, 0.2], top_k=1)
    print("results")
    print(result)
    assert results == [{"title": "A"}]


test_chroma_vector_repository_add_and_search()