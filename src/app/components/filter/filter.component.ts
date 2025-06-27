import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SearchComponent } from '../../shared/ui/search/search.component';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule, SearchComponent, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  filter = { analysis: 'app', country: 'in', search_query: '' };

  @Output() changeFilter = new EventEmitter();
  params: any = { search_query: '' };
  analysis_type: any = {
    app: 'Apps by category, name',
    creator: 'Creators by username',
  };
  search_placeholder = this.analysis_type.app;
  onAnalysisChange(event: any = null, type: any = null) {
    if (type == 'analysis') {
      this.filter.search_query = '';
      this.search_placeholder = this.analysis_type[this.filter.analysis];
      type = null;
    }
    this.changeFilter.emit({ ...this.filter, type });
  }
  applySearch(search_text: any) {
    this.filter = { ...this.filter, search_query: search_text };
    this.onAnalysisChange(null, 'search');
  }
}
