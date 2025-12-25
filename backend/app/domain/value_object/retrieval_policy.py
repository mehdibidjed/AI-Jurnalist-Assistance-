class RetrievalPolicy:

    def __init__(self, top_k: int, min_score: float):
        self.top_k = top_k
        self.min_score = min_score

    def apply(self, results):
        return [
            r for r in results
            if r.get("score", 1.0) >= self.min_score
        ][:self.top_k]

    @staticmethod
    def trend_detection():
        return RetrievalPolicy(top_k=20, min_score=0.75)

    @staticmethod
    def fact_checking():
        return RetrievalPolicy(top_k=10, min_score=0.85)

    @staticmethod
    def article_generation():
        return RetrievalPolicy(top_k=15, min_score=0.70)