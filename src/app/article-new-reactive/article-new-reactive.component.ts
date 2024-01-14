import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameArticleValidator } from './validators/name-article.validator';

@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrl: './article-new-reactive.component.css'
})
export class ArticleNewReactiveComponent implements OnInit {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      // Lógica para guardar el artículo
      console.log('Formulario válido', this.articleForm.value);
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
