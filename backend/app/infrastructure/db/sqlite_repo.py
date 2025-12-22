# app/infrastructure/db/sqlite_repo.py
import sqlite3
from datetime import datetime
from typing import List, Optional
from backend.app.domain.entities.article import Article
from backend.app.domain.entities.source import Source, SourceType
from backend.app.domain.interfaces.Iarticle_repository import ArticleRepository
from backend.app.domain.interfaces.source_repository import SourceRepository
from backend.app.domain.value_object.scraping_policy import ScrapingPolicy

class SQLiteArticleRepository(ArticleRepository):
    def __init__(self, db_path: str = "articles.db"):
        self.conn = sqlite3.connect(db_path)
        self._create_table()

    def _create_table(self):
        cursor = self.conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT UNIQUE,
                content TEXT,
                url TEXT UNIQUE,
                published_date TEXT,
                source TEXT
            )
        """)
        self.conn.commit()

    def save(self, article: Article) -> None:
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT OR IGNORE INTO articles (title, content, url, published_date, source)
            VALUES (?, ?, ?, ?, ?)
        """, (article.title, article.content, article.url, article.published_date.isoformat(), article.source))
        self.conn.commit()
    def exists_by_url(self, url: str) -> bool:
        cursor = self.conn.cursor()
        cursor.execute(
            "SELECT 1 FROM articles WHERE url = ? LIMIT 1",
            (url,)
        )
        return cursor.fetchone() is not None

    def find_by_url(self, url: str) -> Optional[Article]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT title, content, url, published_date, source FROM articles WHERE url = ?", (url,))
        row = cursor.fetchone()
        if row:
            return Article(
                title=row[0],
                content=row[1],
                url=row[2],
                published_date=datetime.fromisoformat(row[3]),
                source=row[4]
            )
        return None

    def find_by_title(self, title: str) -> Optional[Article]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT title, content, url, published_date, source FROM articles WHERE title = ?", (title,))
        row = cursor.fetchone()
        if row:
            return Article(
                title=row[0],
                content=row[1],
                url=row[2],
                published_date=datetime.fromisoformat(row[3]),
                source=row[4]
            )
        return None
    

    
class SQLiteSourceRepository(SourceRepository):
    """
    SQLite implementation of SourceRepository.
    """
    
    def __init__(self, db_path: str):
        """Initialize repository"""
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        """Create tables if they don't exist"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS sources (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    type TEXT NOT NULL,
                    url TEXT NOT NULL,
                    is_active INTEGER NOT NULL,
                    scraping_policy_json TEXT,
                    last_collected TEXT,
                    created_at TEXT NOT NULL
                )
            """)
    
    def save(self, source: Source) -> Source:
        """Save a source to database"""
        import json
        
        policy_json = None
        if source.scraping_policy:
            policy_json = json.dumps({
                'domain': source.scraping_policy.domain,
                'allowed_paths': source.scraping_policy.allowed_paths,
                'rate_limit_seconds': source.scraping_policy.rate_limit_seconds,
                'respect_robots_txt': source.scraping_policy.respect_robots_txt,
                'max_articles_per_session': source.scraping_policy.max_articles_per_session,
                'user_agent': source.scraping_policy.user_agent,
                'timeout_seconds': source.scraping_policy.timeout_seconds,
                'max_content_length': source.scraping_policy.max_content_length,
                'min_content_length': source.scraping_policy.min_content_length
            })
        
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("""
                INSERT INTO sources (name, type, url, is_active, scraping_policy_json, 
                                   last_collected, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                source.name,
                source.type.value,
                source.url,
                1 if source.is_active else 0,
                policy_json,
                source.last_collected.isoformat() if source.last_collected else None,
                source.created_at.isoformat() if source.created_at else datetime.now().isoformat()
            ))
            source.id = str(cursor.lastrowid)
        return source
    
    def update(self, source: Source) -> Source:
        """Update an existing source"""
        import json
        
        policy_json = None
        if source.scraping_policy:
            policy_json = json.dumps({
                'domain': source.scraping_policy.domain,
                'allowed_paths': source.scraping_policy.allowed_paths,
                'rate_limit_seconds': source.scraping_policy.rate_limit_seconds,
                'respect_robots_txt': source.scraping_policy.respect_robots_txt,
                'max_articles_per_session': source.scraping_policy.max_articles_per_session,
                'user_agent': source.scraping_policy.user_agent,
                'timeout_seconds': source.scraping_policy.timeout_seconds,
                'max_content_length': source.scraping_policy.max_content_length,
                'min_content_length': source.scraping_policy.min_content_length
            })
        
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                UPDATE sources 
                SET name=?, type=?, url=?, is_active=?, scraping_policy_json=?, last_collected=?
                WHERE id=?
            """, (
                source.name,
                source.type.value,
                source.url,
                1 if source.is_active else 0,
                policy_json,
                source.last_collected.isoformat() if source.last_collected else None,
                source.id
            ))
        return source
    
    def find_by_type(self, source_type: SourceType, active_only: bool = True) -> List[Source]:
        """Find sources by type"""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            
            query = "SELECT * FROM sources WHERE type = ?"
            params = [source_type.value]
            
            if active_only:
                query += " AND is_active = 1"
            
            cursor = conn.execute(query, params)
            rows = cursor.fetchall()
            return [self._row_to_source(row) for row in rows]
    
    def find_by_id(self, source_id: str) -> Optional[Source]:
        """Find source by ID"""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM sources WHERE id = ?", (source_id,))
            row = cursor.fetchone()
            return self._row_to_source(row) if row else None
    
    def _row_to_source(self, row: sqlite3.Row) -> Source:
        """Convert database row to Source entity"""
        import json
        
        scraping_policy = None
        if row['scraping_policy_json']:
            policy_data = json.loads(row['scraping_policy_json'])
            scraping_policy = ScrapingPolicy(**policy_data)
        
        return Source(
            id=str(row['id']),
            name=row['name'],
            type=SourceType(row['type']),
            url=row['url'],
            is_active=bool(row['is_active']),
            scraping_policy=scraping_policy,
            last_collected=datetime.fromisoformat(row['last_collected']) if row['last_collected'] else None,
            created_at=datetime.fromisoformat(row['created_at']) if row['created_at'] else None
        )