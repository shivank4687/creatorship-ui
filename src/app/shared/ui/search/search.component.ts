import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnChanges {
  search_text = '';
  @Output() triggerSearch = new EventEmitter();
  @Input() placeholder: string = 'Apps';
  @Input() resetSearch: string = '';
  ngOnChanges(changes: SimpleChanges) {
    if ('resetSearch' in changes) {
      this.search_text = this.resetSearch;
    }
  }
  applySearch(clear = false) {
    if (clear) {
      this.search_text = '';
    }
    this.triggerSearch.emit(this.search_text);
  }
}
