import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppComponent } from '../../shared/forms/create-app/create-app.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SearchComponent } from '../../shared/ui/search/search.component';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    CommonModule,
    SearchComponent,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  filter = {
    analysis: 'app',
    country: '',
    platform: 'insta',
    search_query: '',
  };
  admin = false;
  readonly dialog = inject(MatDialog);
  @Output() changeFilter = new EventEmitter();
  params: any = { search_query: '' };
  analysis_type: any = {
    app: 'Apps by category, name',
    creator: 'Creators by username',
  };
  search_placeholder = this.analysis_type.app;

  ngOnInit() {
    if (localStorage.getItem('action_code') == 'job') {
      this.admin = true;
    }
  }

  onAnalysisChange(event: any = null, type: any = null) {
    if (type == 'analysis') {
      // this.filter.search_query = '';
      this.search_placeholder = this.analysis_type[this.filter.analysis];
      type = null;
    }
    this.changeFilter.emit({ ...this.filter, type });
  }
  applySearch(search_text: any) {
    this.filter = { ...this.filter, search_query: search_text };
    this.onAnalysisChange(null, 'search');
  }

  create(
    enterAnimationDuration: string = '100ms',
    exitAnimationDuration: string = '100ms'
  ): void {
    this.dialog.open(CreateAppComponent, {
      width: '600px',
      // height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
