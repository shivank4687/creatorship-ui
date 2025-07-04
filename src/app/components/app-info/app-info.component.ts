import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';
import { InstaCardComponent } from '../../shared/ui/insta-card/insta-card.component';
import { TableComponent } from '../../shared/ui/table/table.component';

@Component({
  selector: 'app-app-info',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    InstaCardComponent,
  ],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.css',
})
export class AppInfoComponent implements OnInit, OnChanges {
  private route = inject(ActivatedRoute);
  date_range: number = 15;
  id!: number;
  appInfo!: any;
  columns = [
    'content',
    'influencer',
    'collabs',
    'mediaType',
    'likes',
    'views',
    'comments',
    'tags',
    // 'platform',
    'publishedDate',
  ];

  influencers = [];
  constructor(private appService: AppService) {}
  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('app_id')!);
    this.getAppInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {}

  async getAppInfo() {
    let info: any = await this.appService.appInfo({
      app_id: this.id,
      date_range: this.date_range,
    });
    info.appCreators = info.appCreators.map((e: any) => e.creator);

    this.appInfo = info;
    const { appCreatorMedia } = this.appInfo;

    this.influencers = appCreatorMedia.map((cm: any) => {
      const { media } = cm;
      const {
        creator,
        publishedDate,
        likes,
        comments,
        views,
        caption,
        mediaType,
        tags,
        content,
      } = media;
      let influencer = creator.username,
        platform = creator.platform,
        profileUrl = creator.profileUrl,
        collabs = media.collaborators
          .map((e: any) => {
            let { username, profileUrl } = e.creator;
            return { username, profileUrl };
          })
          .filter((e: any) => e.username != influencer);
      return {
        content,
        influencer,
        mediaType,
        likes: extractNumber(likes || ''),
        actual_likes: likes,
        comments: extractNumber(comments || ''),
        actual_comments: comments,
        views: extractNumber(views || ''),
        actual_views: views,
        tags,
        collabs,
        // caption,
        profileUrl,
        platform,
        publishedDate,
      };
    });
  }
  changeDateRange(event: any) {
    this.getAppInfo();
  }
}

function extractNumber(str: string): number {
  // Case 1: If string contains commas like "1,23,445 comments"
  if (str.includes(',')) {
    return parseInt(str.replace(/,/g, '').replace(/\D/g, ''), 10);
  }

  // Case 2: If string has short notation like "2.3K comments", "1M comments"
  const match = str.match(/([\d.]+)\s*([KM]?)/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const suffix = match[2].toUpperCase();

  const multiplier = suffix === 'M' ? 1_000_000 : suffix === 'K' ? 1_000 : 1;

  return Math.round(value * multiplier);
}

function parseViewCount(str: string): any {
  const match = str.match(/([\d.]+)\s*([MK]?)/i);
  if (!match) return str;

  const value = parseFloat(match[1]);
  const suffix = match[2].toUpperCase();

  const multiplier = suffix === 'M' ? 1_000_000 : suffix === 'K' ? 1_000 : 1;

  return Math.round(value * multiplier);
}
