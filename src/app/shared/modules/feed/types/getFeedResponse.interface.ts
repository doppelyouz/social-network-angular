import { ArticleInterface } from "src/app/article.interface"

export interface GetFeedResponseInterface {
  articles: ArticleInterface[]
  articlesCount: number
}
