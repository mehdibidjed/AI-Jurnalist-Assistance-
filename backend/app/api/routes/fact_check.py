from fastapi import APIRouter, Depends
from backend.app.api.dtos.fact_check_dto import (
    FactCheckRequest,
    FactCheckResponse
)
from backend.app.api.dependencies import get_fact_check_usecase

router = APIRouter(prefix="/fact-check", tags=["Fact Checking"])


@router.post("", response_model=FactCheckResponse)
def fact_check(
    payload: FactCheckRequest,
    usecase=Depends(get_fact_check_usecase)
):
    result = usecase.execute(payload.article_text)
    print(result)
    return FactCheckResponse(
        classification=result['class'],
        accuracy_score=result['accuracy_score'],

    )