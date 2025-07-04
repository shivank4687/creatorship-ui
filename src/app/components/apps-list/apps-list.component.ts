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
  total_apps = 0;
  pageSize = 20;
  all_apps: any = [];
  pageIndex = 0;
  apps: any = [];
  pagedItems: any[] = [];
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    // this.bindApps();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('params' in changes) {
      // let { type } = this.params;
      let type = false;
      if (type) {
        this.apps = this.all_apps.filter((app: any) => {
          const query = this.params.search_query.toLowerCase();
          if (app.appCreators?.length) {
            let is_found = app.appCreators[0].creator.username
              .toLowerCase()
              .includes(query);
            if (is_found) return is_found;
          }
          return (
            app.name.toLowerCase().includes(query) ||
            app.category.toLowerCase().includes(query)
          );
        });
        // this.all_apps.sort((app: any) => (app.appCreators.length ? -1 : 1));
        this.changePage({ pageSize: 20, pageIndex: 0 });
      } else {
        this.pageIndex = 0;
        this.pageSize = 20;
        this.bindApps();
      }
    }
  }

  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.bindApps();
    return;
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
      // this.all_apps = this.appService.fetched_apps[country];

      // if (!this.all_apps?.length) {
      let page = { pageIndex: this.pageIndex, pageSize: this.pageSize };
      let res: any = await this.appService.appsList({
        ...this.params,
        ...page,
      });
      this.all_apps = res.data;
      this.total_apps = res.total;
      // this.all_apps.sort((app1: any, app2: any) =>
      //   app1.appCreatorMediaCount > app2.appCreatorMediaCount ? -1 : 1
      // );
      // this.appService.fetched_apps[country] = this.all_apps;
      // }
      this.apps = this.all_apps;
      // this.changePage({ pageSize: 20, pageIndex: 0 });
    } catch (ex: any) {
      console.log(ex);
    }
  }
}
