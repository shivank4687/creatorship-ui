import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule, CommonModule],
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.css',
})
export class ButtonToggleComponent {
  @Input() selected: any;
  @Input() buttons: any = [];
  @Output() selectionChanged = new EventEmitter();
  toggle(event: any) {
    this.selectionChanged.emit(this.selected);
  }
}
