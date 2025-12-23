from typing import List
from backend.app.domain.entities.source import Source, SourceType
from backend.app.domain.value_object.scraping_policy import ScrapingPolicy
from backend.app.infrastructure.db.sqlite_repo import SQLiteArticleRepository, SQLiteSourceRepository
from backend.app.infrastructure.ingestion.robots_txt_cache import RobotsTxtCache
from backend.app.infrastructure.ingestion.web_scrapper import WebScraper
from backend.app.usecases.ingest_scrapped_news import IngestScrapedNewsUseCase

def example_setup_scraping_source():
    """
    Example: How to set up a web scraping source with policy
    """
    from backend.app.domain.value_object.scraping_policy import ScrapingPolicy
    from backend.app.domain.entities.source import Source, SourceType
    from backend.app.infrastructure.db.sqlite_repo import SQLiteSourceRepository
    
    # Create scraping policy
    bbc_policy = ScrapingPolicy(
        domain="bbc.com",
        allowed_paths=["/news/", "/world/"],
        rate_limit_seconds=5,
        respect_robots_txt=True,
        max_articles_per_session=20,
        user_agent="NewsAggregator/1.0 (Educational; +contact@example.com)"
    )
    ycombin_policy=ScrapingPolicy(
        domain="news.ycombinator.com",
        allowed_paths=[ "/","/item"],
        rate_limit_seconds=2,
        respect_robots_txt=True,
        max_articles_per_session=20,
        user_agent="NewsAggregator/1.0 (Educational; +contact@example.com)"
    )
    test=ScrapingPolicy(
    domain="theguardian.com",
    allowed_paths=[
        "/world/",
        "/us-news/",
        "/technology/",
        "/science/",
        "/business/"
    ],
    rate_limit_seconds=2
)
    nasa_policy = ScrapingPolicy(
    domain="apod.nasa.gov",
    allowed_paths=["/apod/"],
    rate_limit_seconds=5,
    max_articles_per_session=20,
    respect_robots_txt=True
)
    nasa_gove_policy= ScrapingPolicy(
    domain="nasa.gov",
    allowed_paths=["/news/", "/feature/"],
    rate_limit_seconds=1,
    respect_robots_txt=True,
    max_articles_per_session=40,
)

    # Create source entity
    # bbc has a problem 
    bbc_source = Source(
        name="BBC News",
        type=SourceType.WEB_SCRAPE,
        url="https://www.bbc.com/news",
        is_active=True,
        scraping_policy=bbc_policy
    )
    nasa_source_gov = Source(
        name="NASA",
        type=SourceType.WEB_SCRAPE,
        url="https://www.nasa.gov/news/",
        is_active=True,
        scraping_policy=nasa_gove_policy
    )
    test_source = Source(
        name="The Guardian",
        type=SourceType.WEB_SCRAPE,
        url="https://www.theguardian.com",
        is_active=True,
        scraping_policy=test
    )
    ycombin_source=Source(
         name="ycombinator",
        type=SourceType.WEB_SCRAPE,
        url="https://news.ycombinator.com",
        is_active=True,
        scraping_policy=ycombin_policy
    )
    reuters_policy = ScrapingPolicy(
    domain="reuters.com",
    allowed_paths=["/world/", "/business/", "/technology/"],
    rate_limit_seconds=2,
    max_articles_per_session=50,
    respect_robots_txt=True
    )
    nasa_source = Source(
    name="NASA APOD",
    type=SourceType.WEB_SCRAPE,
    url="https://apod.nasa.gov/apod/",
    is_active=True,
    scraping_policy=nasa_policy
)


    reuters_source = Source(
    name="Reuters",
    type=SourceType.WEB_SCRAPE,
    url="https://www.reuters.com",
    is_active=True,
    scraping_policy=reuters_policy
    # Save to repository
)
    source_repo = SQLiteSourceRepository("news.db")
    saved_source = source_repo.save(nasa_source_gov)

    
    print(f"Created scraping source: {saved_source.name} (ID: {saved_source.id})")

def example_run_scraping():
    """
    Example: How to execute the web scraping ingestion
    """
    from backend.app.usecases.ingest_scrapped_news import IngestScrapedNewsUseCase
    from backend.app.infrastructure.db.sqlite_repo import SQLiteArticleRepository, SQLiteSourceRepository
    from backend.app.infrastructure.ingestion.web_scrapper import WebScraper
    from backend.app.infrastructure.ingestion.robots_txt_cache import RobotsTxtCache
    
    # Initialize dependencies
    article_repo = SQLiteArticleRepository("news.db")
    source_repo = SQLiteSourceRepository("news.db")
    robots_cache = RobotsTxtCache()
    web_scraper = WebScraper(robots_cache)
    
    # Create and execute use case
    use_case = IngestScrapedNewsUseCase(
        article_repository=article_repo,
        source_repository=source_repo,
        web_scraper=web_scraper,
        max_days_old=30
    )
    
    stats = use_case.execute()
    
    print("\n=== Scraping Results ===")
    print(f"Sources processed: {stats['sources_processed']}")
    print(f"URLs discovered: {stats['urls_discovered']}")
    print(f"Articles scraped: {stats['articles_scraped']}")
    print(f"Articles saved: {stats['articles_saved']}")
    print(f"Duplicates skipped: {stats['duplicates_skipped']}")
    print(f"Invalid skipped: {stats['invalid_skipped']}")
    print(f"Errors: {stats['errors']}")


# Example 3: Complete integration with FastAPI
def example_fastapi_integration():
    """
    Example: How to integrate with FastAPI routes
    """
    from fastapi import FastAPI, Depends
    
    app = FastAPI()
    
    # Dependency injection for repositories and scraper
    def get_article_repository():
        return SQLiteArticleRepository()
    
    def get_source_repository():
        return SQLiteSourceRepository()
    
    def get_web_scraper():
        robots_cache = RobotsTxtCache()
        return WebScraper(robots_cache)
    
    @app.post("/api/scrape/run")
    def run_scraping(
        article_repo: SQLiteArticleRepository = Depends(get_article_repository),
        source_repo: SQLiteSourceRepository = Depends(get_source_repository),
        scraper: WebScraper = Depends(get_web_scraper)
    ):
        """
        API endpoint to trigger web scraping
        """
        use_case = IngestScrapedNewsUseCase(
            article_repository=article_repo,
            source_repository=source_repo,
            web_scraper=scraper
        )
        
        stats = use_case.execute()
        return {"status": "success", "stats": stats}
    
    @app.post("/api/scrape/sources")
    def create_scraping_source(
        name: str,
        url: str,
        domain: str,
        allowed_paths: List[str],
        source_repo: SQLiteSourceRepository = Depends(get_source_repository)
    ):
        """
        API endpoint to create a new scraping source
        """
        policy = ScrapingPolicy(
            domain=domain,
            allowed_paths=allowed_paths,
            rate_limit_seconds=5,
            respect_robots_txt=True,
            max_articles_per_session=30
        )
        
        source = Source(
            name=name,
            type=SourceType.WEB_SCRAPE,
            url=url,
            is_active=True,
            scraping_policy=policy
        )
        
        saved_source = source_repo.save(source)
        return {
            "status": "success",
            "source_id": saved_source.id,
            "name": saved_source.name
        }


# Example 4: CLI script for manual scraping
if __name__ == "__main__":
    """
    CLI script to run web scraping manually
    """
    import sys
    import logging
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    print("News Scraping CLI")
    print("=" * 50)
    
    choice = input("Choose action:\n1. Setup new source\n2. Run scraping\n> ")
    
    if choice == "1":
        example_setup_scraping_source()
    elif choice == "2":
        example_run_scraping()
    else:
        print("Invalid choice")
        sys.exit(1)