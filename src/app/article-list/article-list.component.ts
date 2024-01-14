import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article-service.service';
import { Article } from '../models/article.model';
@Component({
  selector: 'app-article-list',
  template: `
            <div class="article-list-container">
              <div *ngFor="let article of articles">
                  <app-article-item [article]="article" (increment)="incrementQuantity($event)" (decrement)="decrementQuantity($event)"></app-article-item>
              </div>
             </div>`,
  styles: `
  .article-list-container {
    display: flex;
    flex-direction: row;
    justify-content: center; 
  }
    `
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  incrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, 1).subscribe((updatedArticle) => {
      if (updatedArticle) {
        // Actualizar la cantidad en el artículo local
        const index = this.articles.findIndex((article) => article.id === articleId);
        if (index !== -1) {
          this.articles[index].quantityInCart = updatedArticle.quantityInCart;
        }
      } else {
        // Manejar el caso de error (puede ser que el artículo no se encontró)
      }
    });
  }

  decrementQuantity(articleId: number): void {
    this.articleService.changeQuantity(articleId, -1).subscribe((updatedArticle) => {
      this.articleService.changeQuantity(articleId, -1).subscribe((updatedArticle) => {
        if (updatedArticle) {
          // Actualizar la cantidad en el artículo local
          const index = this.articles.findIndex((article) => article.id === articleId);
          if (index !== -1) {
            this.articles[index].quantityInCart = updatedArticle.quantityInCart;
          }
        } else {
          // Manejar el caso de error (puede ser que el artículo no se encontró)
        }
      });
    });
  }

  // articles = [
  //   {
  //     id: 1,
  //     name: 'JavaScript y Angular: De los fundamentos del lenguaje al desarrollo de una aplicación web',
  //     imageUrl: '../assets/JSYAngular.jpg',
  //     price: 28.41,
  //     isOnSale: true,
  //     quantityInCart: 0
  //   },
  //   {
  //     id: 2,
  //     name: 'AngularJS',
  //     imageUrl: '../assets/AngularJS.jpg',
  //     price: 36.10,
  //     isOnSale: false,
  //     quantityInCart: 0
  //   },
  //   {
  //     id: 3,
  //     name: 'El gran libro de Angular',
  //     imageUrl: '../assets/AngularGranLibro.jpg',
  //     price: 23.56,
  //     isOnSale: true,
  //     quantityInCart: 0
  //   }
  // ];
}
