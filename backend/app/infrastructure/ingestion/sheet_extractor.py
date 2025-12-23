import pandas as pd
from datetime import datetime, timezone
from backend.app.domain.interfaces.ISheetExtractor import IArticleExtractor


class CSVExtractor(IArticleExtractor):
    """
    Extract articles from a CSV file and return as a list of article dicts.
    """

    def __init__(self, file_path: str, source_name: str = "CSVSheet"):
        self.file_path = file_path
        self.source_name = source_name

    def extract_articles(self):
        articles = []
        df = pd.read_csv(self.file_path)

        # Clean column names
        df.columns = df.columns.str.strip()

        # Drop rows with missing title or content or url
        required_columns = ["title", "content", "url","source"]
        df = df.dropna(subset=required_columns)

        for _, row in df.iterrows():
            title = str(row.get("title", "")).strip()
            content = str(row.get("content", "")).strip()
            url = str(row.get("url", "")).strip()
            published_date_raw = row.get("published_date", "")
            source=row.get("source","")
            # Try parsing date, fallback to current UTC
            try:
                published_date = datetime.strptime(
                    published_date_raw, "%a, %d %b %Y %H:%M:%S %Z"
                ).replace(tzinfo=timezone.utc)
            except Exception:
                published_date = datetime.now(timezone.utc)
                print(f"Invalid date format: {published_date_raw}. Using current UTC time instead.")

            articles.append({
                "title": title,
                "content": content,
                "url": url,
                "published_date": published_date,
                "source": source
            })

        return articles
