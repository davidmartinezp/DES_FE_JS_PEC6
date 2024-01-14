import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './models/article.model'; // Ajusta la importación según la ubicación de tu modelo


@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private articles: Article[] = [];

  constructor() { }

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    const articleToUpdate = this.articles.find(article => article.id === articleID);

    if (articleToUpdate) {
      articleToUpdate.quantityInCart += changeInQuantity;
      return of(articleToUpdate);
    }

    return of(null as any); 
  }

  create(article: Article): Observable<any> {
    this.articles.push(article);
    return of({ success: true });
  }

}
