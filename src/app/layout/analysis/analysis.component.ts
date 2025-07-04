import { Component } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { MatCardModule } from '@angular/material/card';
import { AppsListComponent } from '../../components/apps-list/apps-list.component';
import { CreatorListComponent } from '../../components/creator-list/creator-list.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    FilterComponent,
    MatCardModule,
    AppsListComponent,
    CreatorListComponent,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent {
  analysis_type = 'app';
  params: any = { search_query: '', country: '' };

  applyFilter(filter: any) {
    const { search_query, analysis, country, type } = filter;
    this.analysis_type = analysis;
    this.params = { ...this.params, country, search_query, analysis, type };
  }
}
