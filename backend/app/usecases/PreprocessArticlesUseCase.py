class PreprocessArticlesUseCase:

    def __init__(self, repo, cleaner, chunker):
        self.repo = repo
        self.cleaner = cleaner
        self.chunker = chunker

    def execute(self):
        articles = self.repo.fetch_raw_articles()

        for article_id, raw_content in articles:
            clean_text = self.cleaner.clean(raw_content)

            if len(clean_text) < 300:
                continue

            chunks = self.chunker.split(clean_text)

            for idx, chunk in enumerate(chunks):
                self.repo.save_processed_chunk(
                    article_id=article_id,
                    chunk_index=idx,
                    content=chunk
                )
