from dataclasses import dataclass

@dataclass(frozen=True)
class MediaAuthenticity:
    authenticity_score: float
    is_generated : bool
    confidence : float
    model_name : str
