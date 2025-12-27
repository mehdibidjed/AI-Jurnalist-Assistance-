from dataclasses import dataclass

@dataclass(frozen=True)
class MediaAuthenticityResult:
    authenticity_score: float  # 0–100 (100 = real)
    is_generated: bool
    confidence: float
    model_name: str