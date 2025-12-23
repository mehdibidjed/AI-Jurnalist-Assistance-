from backend.app.usecases.PreprocessArticlesUseCase import PreprocessArticlesUseCase
from backend.app.infrastructure.db.sqlite_repo import SQLiteArticleRepository
from backend.app.infrastructure.ai.journalism_chunker import JournalismChunker
from backend.app.infrastructure.ai.embeddings import EmbeddingService
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository


def main():
    # --- Infrastructure wiring ---
    article_repo = SQLiteArticleRepository("../../data/articles.db")
    chunker = JournalismChunker()
    embedder = EmbeddingService()
    vector_repo = PineconeVectorRepository(dimension=384)

    # --- Use case ---

    usecase = PreprocessArticlesUseCase(
        article_repo=article_repo,
        chunker=chunker,
        embedder=embedder,
        vector_repo=vector_repo
    )

    # --- Execute ---
    usecase.execute()

    print("✅ Article preprocessing completed successfully.")


if __name__ == "__main__":
    main()
