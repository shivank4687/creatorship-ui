import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ButtonComponent } from '../button/button.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

declare global {
  interface Window {
    instgrm: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

declare const instgrm: any;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatSortModule,
    // BrowserAnimationsModule,
    CapitalizePipe,
    CommonModule,
    MatPaginatorModule,
    ButtonComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges, AfterViewInit {
  safeUrl!: SafeResourceUrl;
  pageIndex = 0;
  @Input() type!: string;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any = [];
  @Input() dataUpdate: any = [];
  @Input() sortField: string = 'name'; // default sort field
  @Output() performAction = new EventEmitter();
  sortDirection: 'asc' | 'desc' = 'asc'; // default sort
  pagedItems: any[] = [];
  constructor(private sanitizer: DomSanitizer) {}
  ngOnChanges(changes: SimpleChanges) {
    if ('dataSource' in changes) {
      this.dataSource = this.dataSource.map((e: any) => {
        let iframe = e.content
          ? this.sanitizer.bypassSecurityTrustResourceUrl(e.content)
          : '';
        return { ...e, iframe };
      });

      this.changePage({ pageIndex: 0, pageSize: 10 }, true);
    }
    if ('dataUpdate' in changes) {
      if (this.dataUpdate) {
        this.updateRow();
      }
    }
  }

  ngAfterViewInit(): void {
    if (window['instgrm']) {
      window['instgrm'].Embeds.process();
    }
  }

  changePage(event: any, initial = false) {
    this.pageIndex = event.pageIndex;
    let sortedItems: any = this.dataSource;
    if (!initial) {
      sortedItems = this.sortItems(
        this.dataSource,
        this.sortField,
        this.sortDirection
      );
    }

    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = sortedItems.slice(startIndex, endIndex);
  }

  onSortChange(event: any) {
    this.sortField = event.active;
    this.sortDirection = event.direction as 'asc' | 'desc';
    this.changePage({ pageIndex: 0, pageSize: 10 }); // Reset to first page
  }

  sortItems(data: any[], field: string, direction: 'asc' | 'desc' | ''): any[] {
    if (!direction) return this.dataSource;
    return data.slice().sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA == null) return 1;
      if (valB == null) return -1;

      const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  updateRow() {
    let row: any = this.pagedItems.find((e: any) => e.id == this.dataUpdate.id);
    console.log('row', row);
    if (!row) return;
    row.postsScraped = this.dataUpdate.postsScraped;
    row.runCount = this.dataUpdate.runCount;
    row.status = this.dataUpdate.status;
    row.jobMode = this.dataUpdate.jobMode;
  }

  trigggerAction(action: any, data: any) {
    this.performAction.emit({ action, data });
    data.status = 'in_progress';
  }
}
