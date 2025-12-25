from backend.app.domain.interfaces.Iretrieval_service import IRetrievalService
from backend.app.domain.interfaces.Ivector_repository import IVectorRepository
from backend.app.domain.interfaces.Iembedding_service import IEmbeddingService
from backend.app.domain.value_object.retrieval_query import RetrievalQuery

class PineconeRetrievalService(IRetrievalService):

    def __init__(
        self,
        vector_repo: IVectorRepository,
        embedding_service: IEmbeddingService
    ):
        self.vector_repo = vector_repo
        self.embedding_service = embedding_service

    def retrieve(self, query: RetrievalQuery):
        query_vector = self.embedding_service.embed(query.text)

        results = self.vector_repo.search(
            query_vector=query_vector,
            top_k=query.policy.top_k
        )

        return [
            r for r in results
        ]