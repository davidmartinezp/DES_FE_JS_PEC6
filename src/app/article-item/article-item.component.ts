import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleQuantityChange } from '../models/article-quantity-change.model';


@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent {
  @Input() article?: Article;
  // @Output() articleQuantityChange: EventEmitter<ArticleQuantityChange> = new EventEmitter();
  @Output() increment = new EventEmitter<number>();
  @Output() decrement = new EventEmitter<number>();

  incrementQuantity() {
    if (this.article) {
      this.increment.emit(this.article.id);
    }
    
    // if (this.article) {
    //   this.article.quantityInCart++;
    //   this.emitArticleQuantityChange();
    // }
  }
  
  decrementQuantity() {
    if (this.article) {
      this.decrement.emit(this.article.id);
    }
    
    // if (this.article && this.article.quantityInCart > 0) {
    //   this.article.quantityInCart--;
    //   this.emitArticleQuantityChange();
    // }
  }

  // private emitArticleQuantityChange() {
  //   if (this.article) {
  //     const articleQuantityChange: ArticleQuantityChange = {
  //       article: this.article,
  //       quantity: this.article.quantityInCart
  //     };
  
  //     this.articleQuantityChange.emit(articleQuantityChange);
  //   }
  // }
}
