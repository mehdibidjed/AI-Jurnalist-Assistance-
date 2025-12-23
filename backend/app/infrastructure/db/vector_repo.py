import chromadb
from backend.app.domain.interfaces.Ivector_repository import IVectorRepository

class ChromaVectorRepository(IVectorRepository):

    def __init__(self, collection_name="articles"):
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(
            name=collection_name
        )

    def add(self, ids, vectors, metadatas):
        self.collection.add(
            ids=ids,
            embeddings=vectors,
            metadatas=metadatas
        )

    def search(self, query_vector, top_k):
        results = self.collection.query(
            query_embeddings=[query_vector],
            n_results=top_k
        )
        return results["metadatas"][0]