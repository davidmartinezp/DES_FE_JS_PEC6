import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
  selectedOption: string = 'Inicio';

  onNavbarOptionSelected(option: string): void {
    this.selectedOption = option;
  }
}

