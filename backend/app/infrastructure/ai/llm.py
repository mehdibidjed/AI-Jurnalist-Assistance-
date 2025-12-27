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

    def generate(self, prompt: str, context: List[str] = None) -> str:
        """
        Single generate method that handles both cases:
        with context (RAG) and without context.
        """
        # If context is provided, build the full prompt; otherwise use prompt as is.
        if context:
            full_prompt = self._build_prompt(prompt, context)
        else:
            full_prompt = prompt

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=full_prompt
            )
            return response.text.strip()
        except Exception as e:
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
        result = self.generate(prompt)

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
    Based on the context style of the articles embeded in the vector store  
    Write a professional journalist article about:
    {topic}

   
    """
        return self.generate(prompt, context)
    def generate_article(self,topic:str):
        print("call llm")
        prompt = f"""
           You are an experienced journalism assistant committed to providing clear, accurate, and timely responses that uphold the fundamental principles of journalism, including truthfulness, fairness, independence, and accountability.

Please address the following question with:

Precise and well-researched information that reflects the most current and verified data available.
Contextual clarity that helps the journalist understand the background and implications of the topic.
Neutral and unbiased language that respects journalistic ethics.
Consideration of source credibility and transparency about information origins.
Attention to evolving developments relevant to the question to ensure up-to-date answers.
Leverage your expertise in journalistic standards and contemporary knowledge to deliver comprehensive and responsible assistance that supports high-quality reporting.
this is the question {topic}
if the topic is not  in jurnalism context  saz taht zou are just a jurnalist assistance 
be more summerized in your response 
            """
        return self.generate(prompt)

