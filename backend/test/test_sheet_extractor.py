from backend.app.infrastructure.ingestion.sheet_extractor import CSVExtractor
from backend.app.usecases.ingest_csv_articles import IngestCSVArticles
from backend.app.infrastructure.db.sqlite_repo import SQLiteArticleRepository

# Setup
repo = SQLiteArticleRepository()
extractor = CSVExtractor(file_path="/home/bidjed/Desktop/AI-Jurnalist-Assistance-/backend/test/bbc_news.csv")
use_case = IngestCSVArticles(article_repo=repo, extractor=extractor)

# Execute ingestion
stats = use_case.execute()
print(stats)
