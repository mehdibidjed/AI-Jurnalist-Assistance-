from unittest.mock import MagicMock
from backend.app.infrastructure.ai.journalism_chunker import JournalismChunker

def test_journalism_chunker_splits_text():
    chunker = JournalismChunker()

    # Mock semantic splitter to avoid loading embeddings
    chunker.splitter.create_documents = MagicMock(
        return_value=[
            MagicMock(page_content="Chunk A"),
            MagicMock(page_content="Chunk B")
        ]
    )
    chunks = chunker.split("some article text")

    assert len(chunks) == 2
    assert chunks[0] == "Chunk A"
