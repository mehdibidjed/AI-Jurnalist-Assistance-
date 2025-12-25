from pydantic import BaseModel
from typing import List


class ContentGenerationRequest(BaseModel):
    prompt: str
    tone: str | None = "neutral"


class ContentGenerationResponse(BaseModel):
    content: str