import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameArticleValidator } from './validators/name-article.validator';
import { ArticleService } from '../article-service.service';
import { firstValueFrom } from 'rxjs';

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

  async onSubmit(): Promise<void> {
    if (this.articleForm.valid) {
      const newArticle = {
        id: Date.now(),
        name: this.articleForm.value.nombre,
        price: this.articleForm.value.precio,
        imageUrl: this.articleForm.value.imageUrl,
        isOnSale: this.articleForm.value.enVenta,
        quantityInCart: 0,
      };

      try {
        const response = await firstValueFrom(this.articleService.create(newArticle));

        // Manejar la respuesta del servicio
        console.log('Artículo creado con éxito:', response);
        // Mostrar mensaje de éxito
        alert('Artículo creado con éxito');
        // Resetear el formulario
        this.articleForm.reset();
      } catch (error) {
        // Manejar errores del servicio
        console.error('Error al crear el artículo:', error);
      }
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
