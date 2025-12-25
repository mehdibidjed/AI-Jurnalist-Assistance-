from pydantic import BaseModel



class ChatbotGenerationRequest(BaseModel):
    prompt: str


class ChatbotGenerationResponse(BaseModel):
    content: str