# app/api/dependencies.py
from fastapi import Depends

from backend.app.infrastructure.ai.embeddings import EmbeddingService
from backend.app.infrastructure.ai.llm import GeminiLLMService
from backend.app.infrastructure.db.pinecone_vector_repo import PineconeVectorRepository
from backend.app.infrastructure.ai.retrieval_service import PineconeRetrievalService
from backend.app.usecases.chatbot import GenerateContentChatBotUseCase
from backend.app.usecases.detect_trends import DetectTrendsUseCase
from backend.app.usecases.generate_content import GenerateContentUseCase
from backend.app.usecases.fact_check import FactCheckUseCase


##service dependencies

def get_embedding_service():
    return EmbeddingService()


def get_vector_repository():
    return PineconeVectorRepository()


def get_llm_service():
    return GeminiLLMService()


def get_retrieval_service(
        embedding_service=Depends(get_embedding_service),
        vector_repo=Depends(get_vector_repository)
):
    return PineconeRetrievalService(
        vector_repo=vector_repo,
        embedding_service=embedding_service

    )


##usecase dependencies

def get_detect_trends_usecase(
        retrieval_service=Depends(get_retrieval_service),
        llm_service=Depends(get_llm_service)
):
    return DetectTrendsUseCase(
        retrieval_service=retrieval_service,
        llm_service=llm_service
    )


def get_generate_content_usecase(
        retrieval_service=Depends(get_retrieval_service),
        llm_service=Depends(get_llm_service)
):
    return GenerateContentUseCase(
        retrieval_service=retrieval_service,
        llm_service=llm_service
    )
def get_generate_content_usecase(
        llm_service=Depends(get_llm_service)
):
    print("llm 1")
    return GenerateContentChatBotUseCase(
        llm_service=llm_service
    )

def get_fact_check_usecase(
        retrieval_service=Depends(get_retrieval_service),
        llm_service=Depends(get_llm_service)
):
    return FactCheckUseCase(
        retrieval_service=retrieval_service,
        llm_service=llm_service
    )