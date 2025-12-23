# test_rss_collector.py

from backend.app.infrastructure.ingestion.rss_collector import RSSCollector
from backend.app.infrastructure.db.sqlite_repo import SQLiteArticleRepository

# Step 1: Initialize repository (SQLite)
repo = SQLiteArticleRepository()

# Step 2: Initialize RSS collector with repository
collector = RSSCollector(repository=repo)

# Step 3: Provide some RSS feed URLs
feed_urls = [
    "http://rss.cnn.com/rss/edition.rss",
    "https://feeds.bbci.co.uk/news/rss.xml",
    "https://www.theguardian.com/world/rss",
]

# Step 4: Collect articles
results = collector.collect_feeds(feed_urls)

# Step 5: Print statistics
print("\n=== Collection Results ===")
print(f"Total processed: {results['total_processed']}")
print(f"New articles saved: {results['new_articles']}")
print(f"Duplicates skipped: {results['duplicates_skipped']}")
print(f"Invalid entries skipped: {results['invalid_skipped']}")
print(f"Errors encountered: {results['errors']}")
