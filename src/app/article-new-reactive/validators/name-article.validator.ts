import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NameArticleValidator {
  static invalidName: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const invalidNames = ['Prueba', 'Test', 'Mock', 'Fake'];
    const inputValue = control.value as string;

    if (invalidNames.includes(inputValue)) {
      return { invalidName: true };
    }

    return null;
  };
}
