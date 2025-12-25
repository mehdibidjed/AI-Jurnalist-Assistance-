import json
from typing import List, Dict
from google import genai
from backend.app.config.settings import GEMINI_API_KEY
from backend.app.domain.entities.trend import Trend
from backend.app.domain.interfaces.Illm_service import ILlmService
import re


class GeminiLLMService(ILlmService):
    """
    Gemini-based LLM service optimized for RAG journalism workflows.
    """

    def __init__(
        self,
        model_name: str = "gemini-2.5-flash-preview-09-2025",
        temperature: float = 0.2,
        max_output_tokens: int = 1024,
    ):
        # Initialize the Google GenAI client
        self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model_name = model_name
        self.temperature = temperature
        self.max_output_tokens = max_output_tokens

    def generate(self, prompt: str, context: List[str]) -> str:
        # Build the full prompt including context
        full_prompt = self._build_prompt(prompt, context)

        try:
            # Call the Gemini model
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=full_prompt
            )
            return response.text.strip()
        except Exception as e:
            # Handle API errors
            return f"Error during generation: {str(e)}"

    def _build_prompt(self, prompt: str, context: List[str]) -> str:
        # Combine context chunks
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

    def detect_trends(self, articles: List[str]) -> List[Trend]:
        prompt = """
Extract trending topics.
Return a JSON array with:
- topic
- short description
- confidence_score (0–100)
"""
        raw_output = self.generate(prompt, articles)
        print(raw_output)
        try:
            # Match the first [...] block in the result
            match = re.search(r"\[.*\]", raw_output, re.DOTALL)
            if not match:
                raise ValueError("No JSON array found in LLM output")
            json_str = match.group()
            result= json.loads(json_str)
            trends: List[Trend] = []

            for item in result:
                trends.append(
                    Trend(
                        topic=item["topic"],
                        description=item["short description"],
                        confidence_score=int(item["confidence_score"])
                    )
                )

            return trends

        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON returned by LLM: {raw_output}") from e



    def evaluate_article(self, article_text: str, sources: List[str]) -> Dict:
        print("Iam here")
        prompt = f"""
    Evaluate the reliability of the following article.

    Return STRICT JSON WITHOUT ANY ADDITONAL STRINGS:
    {{
      "class": "reliable | not reliable | doubted",
      "accuracy_score": integer
    }}

    ARTICLE:
    {article_text}
    """
        # 1. Generate the LLM output
        result = self.generate(prompt, sources)

        # 2. Extract JSON from the result (in case LLM adds extra text)
        try:
            # Match the first {...} block in the result
            match = re.search(r"\{.*\}", result, re.DOTALL)
            if not match:
                raise ValueError("No JSON object found in LLM output")
            json_str = match.group()
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON returned by LLM: {result}") from e

    def generate_article(self, topic: str, context: List[str]) -> str:
        prompt = f"""
    Write a professional journalist article about:
    {topic}

    Style:
    - Neutral
    - Fact-based
    - No speculation
    """
        return self.generate(prompt, context)