
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article-service.service';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  template: `
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

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }

  incrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, 1).subscribe();
  }

  decrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, -1).subscribe();
  }

}
