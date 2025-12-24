import os
from typing import List

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.messages import HumanMessage
from backend.app.config.settings import (
GEMINI_API_KEY
)

from backend.app.domain.interfaces.Illm_service import ILlmService


class GeminiLLMService(ILlmService):
    """
    Gemini-based LLM service optimized for RAG journalism workflows.
    """

    def __init__(
        self,
        model_name: str = "gemini-1.5-pro",
        temperature: float = 0.2,
        max_output_tokens: int = 1024
    ):

        self.model =  ChatGoogleGenerativeAI(
            model=model_name,
            google_api_key=GEMINI_API_KEY,
            temperature=temperature,
            max_output_tokens=max_output_tokens)

    def generate(self, prompt: str, context: List[str]) -> str:
        full_prompt = self._build_prompt(prompt, context)
        response = self.model(
            [HumanMessage(content=full_prompt)]
        )
        return response.content.strip()



    def _build_prompt(self, prompt: str, context: List[str]) -> str:
        context_block = "\n\n".join(
            f"[SOURCE {i+1}]\n{chunk}"
            for i, chunk in enumerate(context)
        )

        return f"""
You are a professional journalism assistant.

STRICT RULES:
- Use ONLY the information from the sources below
- Do NOT invent facts
- If sources are insufficient, say so clearly

SOURCES:
{context_block}

TASK:
{prompt}

ANSWER:
"""