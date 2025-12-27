from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class VisionInputSpec:
    width: int
    height: int
    mean: List[float]
    std: List[float]