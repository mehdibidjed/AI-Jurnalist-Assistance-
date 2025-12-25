from unittest.mock import MagicMock, patch
from backend.app.infrastructure.ai.llm import GeminiLLMService


def test_gemini_llm_generate_returns_text():
    mock_response = MagicMock()
    mock_response.content = "LLM output"

    with patch(
        "backend.app.infrastructure.ai.llm.ChatGoogleGenerativeAI"
    ) as MockGemini:

        mock_model = MagicMock()
        mock_model.invoke.return_value = mock_response  # ← THIS IS THE KEY
        MockGemini.return_value = mock_model

        llm = GeminiLLMService()

        result = llm.generate(
            prompt="Summarize the article",
            context=["This is a test article chunk"]
        )

        assert result == "LLM output"
