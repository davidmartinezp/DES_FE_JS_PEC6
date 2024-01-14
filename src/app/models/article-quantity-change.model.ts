import { Article } from "./article.model";

export interface ArticleQuantityChange {
    article: Article; 
    quantity: number;
  }