from fastapi import APIRouter, Depends

from backend.app.api.dtos.chatbot_dto import ChatbotGenerationResponse, ChatbotGenerationRequest
from backend.app.api.dtos.content_generation_dto import (
    ContentGenerationRequest,
    ContentGenerationResponse
)
from backend.app.api.dependencies import get_generate_content_usecase

router = APIRouter(prefix="/chatbot", tags=["Chat Bot"])


@router.post("", response_model=ChatbotGenerationResponse)
def generate_content(
    payload: ChatbotGenerationRequest,
    usecase=Depends(get_generate_content_usecase)
):
    result = usecase.execute(
        payload.prompt
    )

    return ChatbotGenerationResponse(
        content=result
    )