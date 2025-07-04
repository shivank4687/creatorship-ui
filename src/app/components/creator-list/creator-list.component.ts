import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CreatorService } from '../../services/creator.service';
import { CreatorCardComponent } from '../../shared/ui/creator-card/creator-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InstaCardComponent } from '../../shared/ui/insta-card/insta-card.component';
@Component({
  selector: 'app-creator-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    // CreatorCardComponent,
    InstaCardComponent,
  ],
  templateUrl: './creator-list.component.html',
  styleUrl: './creator-list.component.css',
})
export class CreatorListComponent implements OnInit, OnChanges {
  total_creators = 0;
  all_creators: any = [];
  creators: any = [];
  @Input() params: any = {};
  pagedItems: any[] = [];
  pageIndex = 0;
  pageSize = 20;
  constructor(private creatorService: CreatorService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('params' in changes) {
      // const { type } = this.params;
      let type = false;
      if (type) {
        this.creators = this.all_creators.filter((creator: any) => {
          const query = this.params.search_query.toLowerCase();
          let x = creator.username.toLowerCase().includes(query);
          return x;
        });
        this.changePage({ pageSize: 20, pageIndex: 0 });
      } else {
        this.pageIndex = 0;
        this.pageSize = 20;
        this.bindCreators();
      }
    }
  }
  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.bindCreators();
    return;
    // const sortedItems: any = this.sortItems(
    //   this.dataSource,
    //   this.sortField,
    //   this.sortDirection
    // );
    this.pageIndex = event.pageIndex;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedItems = this.creators.slice(startIndex, endIndex);
  }
  async bindCreators() {
    // this.all_creators = this.creatorService.fetched_creators;
    // if (!this.all_creators?.length) {
    const page = { pageSize: this.pageSize, pageIndex: this.pageIndex };
    const res: any = await this.creatorService.creatorList({
      ...this.params,
      ...page,
    });
    this.all_creators = res.data;
    this.total_creators = res.total;
    // this.all_creators.sort((c1: any, c2: any) =>
    //   c1.collaoboratorsMedia.length > c2.collaoboratorsMedia.length ? -1 : 1
    // );
    // this.creatorService.fetched_creators = this.all_creators;
    // }
    this.creators = this.all_creators;
    // this.changePage({ pageSize: 20, pageIndex: 0 });
  }
}
