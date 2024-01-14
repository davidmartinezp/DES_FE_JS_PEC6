import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css'
})
export class ArticleNewTemplateComponent implements OnInit {

  article: any = {
    nombre: '',
    precio: null,
    imageUrl: '',
    enVenta: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
      console.log('Formulario válido:', this.article);
  }

}