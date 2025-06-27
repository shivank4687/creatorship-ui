import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creator-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creator-card.component.html',
  styleUrl: './creator-card.component.css',
})
export class CreatorCardComponent {
  @Input() creator: any;
}
