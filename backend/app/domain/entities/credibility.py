from dataclasses import dataclass
from typing import Dict

@dataclass
class CredibilityReport:
    final_score: float
    risk_level: str
    signals: Dict[str, float]
    explanation: str