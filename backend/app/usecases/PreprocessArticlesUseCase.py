import uuid
from backend.app.domain.interfaces.Iarticle_repository import ArticleRepository
from backend.app.domain.interfaces.Iarticle_chunker import IArticleChunker
from backend.app.domain.interfaces.Iembedding_service import IEmbeddingService
from backend.app.domain.interfaces.Ivector_repository import IVectorRepository

class PreprocessArticlesUseCase:
    def __init__(self,article_repo: ArticleRepository,chunker: IArticleChunker,embedder: IEmbeddingService,vector_repo: IVectorRepository):
        self.article_repo=article_repo
        self.chunker = chunker
        self.embedder = embedder
        self.vector_repo = vector_repo

    def execute(self):
        articles = self.article_repo.get_all()
        print(articles)
        for article in articles:
            chunks = self.chunker.split(article.content)

            embeddings = self.embedder.embed(chunks)

            ids = [str(uuid.uuid4()) for _ in chunks]
            metadatas = [{
                "source": article.source,
                "source_tier": "trusted",
                "published_at": article.published_date,
                "recent": True
            }]



            self.vector_repo.add(ids, embeddings, metadatas)

