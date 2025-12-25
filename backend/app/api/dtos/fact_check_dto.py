from pydantic import BaseModel
from typing import List


class FactCheckRequest(BaseModel):
    article_text: str


class FactCheckResponse(BaseModel):
    classification: str
    accuracy_score: int
