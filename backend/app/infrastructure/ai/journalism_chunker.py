from langchain_experimental.text_splitter import SemanticChunker
from backend.app.domain.interfaces.Iarticle_chunker import IArticleChunker
from langchain_huggingface import  HuggingFaceEmbeddings
class JournalismChunker(IArticleChunker):
    """
    Splits news articles based on topical shifts,
    preserving quotes, narrative flow, and claims.
    """

    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        self.splitter = SemanticChunker(
            self.embeddings,
            breakpoint_threshold_type="percentile",
            breakpoint_threshold_amount=90
        )

    def split(self, text: str) -> list[str]:
        docs = self.splitter.create_documents([text])
        return [doc.page_content for doc in docs]
