import logging
from backend.app.domain.entities.article import Article

logger = logging.getLogger(__name__)

class IngestCSVArticles:
    """
    Use case for ingesting articles from a CSV file using a CSVExtractor.
    """

    def __init__(self, article_repo, extractor):
        self.article_repo = article_repo
        self.extractor = extractor

    def execute(self):
        stats = {
            "articles_scraped": 0,
            "articles_saved": 0,
            "duplicates_skipped": 0,
            "invalid_skipped": 0,
            "errors": 0
        }

        for article_data in self.extractor.extract_articles():
            try:
                print(article_data)
                article = Article(
                    title=article_data['title'],
                    content=article_data['content'],
                    url=article_data['url'],
                    published_date=article_data.get('published_date'),
                    source=article_data['source']
                )

                # validate
                if not self._is_valid_article(article):
                    stats['invalid_skipped'] += 1
                    continue

                # check duplicates
                if self._is_duplicate(article):
                    stats['duplicates_skipped'] += 1
                    continue

                # save article
                self.article_repo.save(article)
                stats['articles_saved'] += 1
                stats['articles_scraped'] += 1

            except Exception as e:
                logger.error(f"Error processing article {article_data.get('title')}: {str(e)}")
                stats['errors'] += 1

        return stats

    def _is_valid_article(self, article):
        return bool(article.title and article.content)

    def _is_duplicate(self, article):
        # Optionally implement title/content hash check
        return False
