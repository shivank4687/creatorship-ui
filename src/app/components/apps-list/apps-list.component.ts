import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppService } from '../../services/app.service';
import { AppCardComponent } from '../../shared/ui/app-card/app-card.component';

@Component({
  selector: 'app-apps-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, AppCardComponent],
  templateUrl: './apps-list.component.html',
  styleUrl: './apps-list.component.css',
})
export class AppsListComponent implements OnInit, OnChanges {
  @Input() params: any = {};
  all_apps: any = [];
  apps: any = [];
  pagedItems: any[] = [];
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    // this.bindApps();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('params' in changes) {
      let { type } = this.params;
      if (type) {
        this.apps = this.all_apps.filter((app: any) => {
          const query = this.params.search_query.toLowerCase();
          return (
            app.name.toLowerCase().includes(query) ||
            app.category.toLowerCase().includes(query)
          );
        });
        this.changePage({ pageSize: 20, pageIndex: 0 });
      } else {
        this.bindApps();
      }
    }
  }

  changePage(event: any) {
    // const sortedItems: any = this.sortItems(
    //   this.dataSource,
    //   this.sortField,
    //   this.sortDirection
    // );
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.apps.slice(startIndex, endIndex);
  }

  async bindApps() {
    try {
      const { country } = this.params;
      this.all_apps = this.appService.fetched_apps[country];
      if (!this.all_apps?.length) {
        this.all_apps = await this.appService.appsList(this.params);
        this.appService.fetched_apps[country] = this.all_apps;
      }
      this.apps = this.all_apps;
      this.changePage({ pageSize: 20, pageIndex: 0 });
    } catch (ex: any) {
      console.log(ex);
    }
  }
}
