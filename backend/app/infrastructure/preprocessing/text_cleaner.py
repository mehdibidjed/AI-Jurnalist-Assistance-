import re
import unicodedata
from bs4 import BeautifulSoup

class TextCleaner:
    """
    Cleans raw article HTML/text into normalized plain text.
    """

    def clean(self, text: str) -> str:

        # Normalize unicode
        text = unicodedata.normalize("NFKC", text)

        # Remove extra whitespace
        text = re.sub(r"\s+", " ", text)

        return text.strip()
