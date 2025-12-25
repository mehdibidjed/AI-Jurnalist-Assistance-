# get trending news
from fastapi import Depends, APIRouter

from backend.app.api.dependencies import get_detect_trends_usecase


router = APIRouter(prefix="/trends", tags=["Trends Generation"])

@router.get("/trends")
def detect_trends(
    usecase=Depends(get_detect_trends_usecase)
):
    trends = usecase.execute()

    return [
        {
            "topic": t.topic,
            "description": t.description,
            "confidence_score": t.confidence_score
        }
        for t in trends
    ]