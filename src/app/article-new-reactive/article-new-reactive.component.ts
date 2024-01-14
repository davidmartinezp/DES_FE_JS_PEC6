import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameArticleValidator } from './validators/name-article.validator';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrl: './article-new-reactive.component.css'
})
export class ArticleNewReactiveComponent implements OnInit {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.articleForm = this.fb.group({
      nombre: [
        '',
        [Validators.required, NameArticleValidator.invalidName]
      ],
      precio: [
        null,
        [Validators.required, Validators.min(0.1)]
      ],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern(/^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]
      ],
      enVenta: false
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const newArticle = {
        id: Date.now(), // Puedes ajustar la generación de IDs según tus necesidades
        name: this.articleForm.value.nombre,
        price: this.articleForm.value.precio,
        imageUrl: this.articleForm.value.imageUrl,
        isOnSale: this.articleForm.value.enVenta,
        quantityInCart: 0,
      };

      this.articleService.create(newArticle).subscribe({
        next: (response) => {
          // Manejar la respuesta del servicio (puede ser éxito o error)
          console.log('Artículo creado con éxito:', response);
          // Mostrar mensaje de éxito
          alert('Artículo creado con éxito');
          // Resetear el formulario
          this.articleForm.reset();
        },
        error: (error) => {
          // Manejar errores del servicio
          console.error('Error al crear el artículo:', error);
        },
      });
    } else {
      // Mostrar mensajes de error al usuario
      console.log('Formulario inválido');
    }
  }

  shouldShowError(controlName: string): boolean {
    const control = this.articleForm.get(controlName);
    return control ? control.invalid && (control.dirty) && control.value !== "" : false;
  }


}
