# app/domain/value_object/retrieval_query.py

from backend.app.domain.value_object.retrieval_policy import RetrievalPolicy

class RetrievalQuery:
    def __init__(self, text: str, policy: RetrievalPolicy):
        self.text = text
        self.policy = policy