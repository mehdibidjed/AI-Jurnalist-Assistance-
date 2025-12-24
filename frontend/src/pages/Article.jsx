import ArticleList from "../components/articles/ArticleList"

export default function Articles() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      <ArticleList />
    </div>
  )
}