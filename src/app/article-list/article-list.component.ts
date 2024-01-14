import { Component } from '@angular/core';

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
export class ArticleListComponent {

  incrementQuantity(articleId: number) {
    const article = this.articles.find(a => a.id === articleId);
    if (article) {
      article.quantityInCart++;
    }
  }

  decrementQuantity(articleId: number) {
    const article = this.articles.find(a => a.id === articleId);
    if (article && article.quantityInCart > 0) {
      article.quantityInCart--;
    }
  }

  articles = [
    {
      id: 1,
      name: 'JavaScript y Angular: De los fundamentos del lenguaje al desarrollo de una aplicación web',
      imageUrl: '../assets/JSYAngular.jpg',
      price: 28.41,
      isOnSale: true,
      quantityInCart: 0
    },
    {
      id: 2,
      name: 'AngularJS',
      imageUrl: '../assets/AngularJS.jpg',
      price: 36.10,
      isOnSale: false,
      quantityInCart: 0
    },
    {
      id: 3,
      name: 'El gran libro de Angular',
      imageUrl: '../assets/AngularGranLibro.jpg',
      price: 23.56,
      isOnSale: true,
      quantityInCart: 0
    }
  ];
}
