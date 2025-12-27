from dataclasses import dataclass

@dataclass(frozen=True)
class CredibilitySignal:
    name: str
    score: float  # 0–100
    weight: float # 0–1