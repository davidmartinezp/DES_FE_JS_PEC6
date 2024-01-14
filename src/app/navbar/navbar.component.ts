import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() optionSelected = new EventEmitter<string>();

  onOptionSelected(option: string): void {
    this.optionSelected.emit(option);
  }
}
