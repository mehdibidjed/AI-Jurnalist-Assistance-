from dataclasses import dataclass

@dataclass(frozen=True)
class Trend:
    topic: str
    description: str
    confidence_score: int