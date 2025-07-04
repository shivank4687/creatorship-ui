import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnChanges, OnDestroy {
  search_text = '';
  @Output() triggerSearch = new EventEmitter();
  @Input() placeholder: string = 'Apps';
  @Input() resetSearch: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef;
  private searchSubject = new Subject<string>();
  private searchSub: Subscription;
  constructor() {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((text) => {
        this.triggerSearch.emit(text);
      });
  }
  ngAfterViewInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if ('resetSearch' in changes) {
      if (this.resetSearch == '') {
        this.search_text = this.resetSearch;
      }
    }
  }
  applySearch(clear = false) {
    if (clear) {
      this.search_text = '';
    }
    this.resetSearch = this.search_text;
    this.searchSubject.next(this.search_text);
    // this.triggerSearch.emit(this.search_text);
  }

  toggleDropdown(show: any) {
    // const menu: any = document.getElementById('search-menu');
    // menu.classList.toggle('hidden', !show);
  }
  ngOnDestroy() {
    this.searchSub.unsubscribe(); // cleanup
  }
}
