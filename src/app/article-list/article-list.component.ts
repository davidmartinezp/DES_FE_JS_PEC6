
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article-service.service';
import { Article } from '../models/article.model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  template: `

    <input type="text" [(ngModel)]="searchTerm" placeholder="Buscar artículo" />
    <button (click)="searchArticles()">Buscar</button>
      
    <div class="article-list-container">
      <div *ngFor="let article of articles$ | async">
        <app-article-item
          [article]="article"
          (increment)="incrementQuantity(article.id)"
          (decrement)="decrementQuantity(article.id)"
        ></app-article-item>
      </div>
    </div>
  `,
  styles: `
    .article-list-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `,
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<Article[]>;
  searchTerm: string = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articles$ = this.articleService.getArticles(this.searchTerm);
  }

  incrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, 1).subscribe(updatedArticle => {
      this.updateArticleInList(updatedArticle);
    });
  }

  searchArticles(): void {
    this.loadArticles();
  }

  decrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, -1).subscribe(updatedArticle => {
      this.updateArticleInList(updatedArticle);
    });
  }

  private updateArticleInList(updatedArticle: Article | null): void {
    if (updatedArticle) {
      this.articles$ = this.articles$.pipe(
        map(articles => articles.map(article => (article.id === updatedArticle.id ? updatedArticle : article)))
      );
    }
  }


}
