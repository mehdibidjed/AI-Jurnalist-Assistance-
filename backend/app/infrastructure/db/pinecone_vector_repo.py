from pinecone import Pinecone, ServerlessSpec
from backend.app.domain.interfaces.Ivector_repository import IVectorRepository
from backend.app.config.settings import (
    PINECONE_API_KEY,
    PINECONE_INDEX_NAME,
    PINECONE_CLOUD,
    PINECONE_REGION
)

class PineconeVectorRepository(IVectorRepository):

    def __init__(self, dimension: int = 384):
        self.pc = Pinecone(api_key=PINECONE_API_KEY)

        existing_indexes = self.pc.list_indexes().names()

        if PINECONE_INDEX_NAME not in existing_indexes:
            self.pc.create_index(
                name=PINECONE_INDEX_NAME,
                dimension=dimension,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud=PINECONE_CLOUD,
                    region=PINECONE_REGION
                )
            )

        self.index = self.pc.Index(PINECONE_INDEX_NAME)

    def add(self, ids, vectors, metadatas):
        self.index.upsert(
            vectors=[
                {
                    "id": id_,
                    "values": vector,
                    "metadata": metadata
                }
                for id_, vector, metadata in zip(ids, vectors, metadatas)
            ]
        )

    def search(self, query_vector, top_k):
        results = self.index.query(
            vector=query_vector,
            top_k=top_k,
            include_metadata=True
        )

        return [match["metadata"] for match in results["matches"]]
