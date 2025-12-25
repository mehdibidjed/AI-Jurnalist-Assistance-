from fastapi import APIRouter, Depends
from backend.app.api.dtos.content_generation_dto import (
    ContentGenerationRequest,
    ContentGenerationResponse
)
from backend.app.api.dependencies import get_generate_content_usecase

router = APIRouter(prefix="/content", tags=["Content Generation"])


@router.post("", response_model=ContentGenerationResponse)
def generate_content(
    payload: ContentGenerationRequest,
    usecase=Depends(get_generate_content_usecase)
):
    result = usecase.execute(
        payload.prompt
    )

    return ContentGenerationResponse(
        content=result
    )