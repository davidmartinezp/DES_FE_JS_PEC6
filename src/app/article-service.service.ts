// article-service.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Article } from './models/article.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  
  private apiUrl = 'http://localhost:3000/api/articles';

  // private articles: Article[] = [];
  // private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  constructor(private http: HttpClient) { }

  // getArticles(): Observable<Article[]> {
  //   return this.http.get<Article[]>(this.apiUrl);
  // }

  getArticles(searchTerm?: string): Observable<Article[]> {
    // Configura los parámetros de la solicitud HTTP
    const params = new HttpParams().set('q', searchTerm || '');

    // Realiza la solicitud HTTP con los parámetros
    return this.http.get<Article[]>(this.apiUrl, { params });
  }
  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    // const articleToUpdate = this.articles.find((article) => article.id === articleID);

    // if (articleToUpdate) {
    //   articleToUpdate.quantityInCart += changeInQuantity;
    //   this.emitArticles(); // Emitir los artículos actualizados
    //   return of(articleToUpdate);
    // }

    // return of(null as any);
    const patchBody = { changeInQuantity };
    return this.http.patch<Article>(`${this.apiUrl}/${articleID}`, patchBody);
  }

  create(article: Article): Observable<any> {
    // this.articles.push(article);
    // this.emitArticles(); // Emitir los artículos actualizados
    // return of({ success: true }).pipe(delay(500)); // Simular una operación asincrónica con un pequeño retraso
    const articleJson = JSON.stringify(article);
    const articleWithoutId = JSON.parse(articleJson, (key, value) => (key === 'id' ? undefined : value));
    return this.http.post(this.apiUrl, articleWithoutId);
  }

  // private emitArticles(): void {
  //   this.articlesSubject.next([...this.articles]); // Clonar el array para evitar mutaciones directas
  // }
}
