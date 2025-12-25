from pydantic import BaseModel
from typing import List


class TrendDTO(BaseModel):
    topic: str
    description: str
    confidence_score: int


class TrendDetectionResponse(BaseModel):
    trends: List[TrendDTO]