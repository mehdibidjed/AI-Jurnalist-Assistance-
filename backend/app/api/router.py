# get trending news
# get fake news
# check article
# generate article
from fastapi import APIRouter
from backend.app.api.routes import (
    health,
    fact_check,
    trends,
    content,
    chatbot
)

router = APIRouter()

router.include_router(health.router)
router.include_router(fact_check.router)
router.include_router(trends.router)
router.include_router(content.router)
router.include_router(chatbot.router)