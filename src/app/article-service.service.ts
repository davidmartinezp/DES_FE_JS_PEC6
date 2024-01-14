// article-service.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { Article } from './models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] = [];
  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  constructor() {}

  getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    const articleToUpdate = this.articles.find((article) => article.id === articleID);

    if (articleToUpdate) {
      articleToUpdate.quantityInCart += changeInQuantity;
      this.emitArticles(); // Emitir los artículos actualizados
      return of(articleToUpdate);
    }

    return of(null as any);
  }

  create(article: Article): Observable<any> {
    this.articles.push(article);
    this.emitArticles(); // Emitir los artículos actualizados
    return of({ success: true }).pipe(delay(500)); // Simular una operación asincrónica con un pequeño retraso
  }

  private emitArticles(): void {
    this.articlesSubject.next([...this.articles]);
  }
}
