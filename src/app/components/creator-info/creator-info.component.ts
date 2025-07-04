import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatorService } from '../../services/creator.service';
import { ButtonToggleComponent } from '../../shared/ui/button-toggle/button-toggle.component';
import { InstaCardComponent } from '../../shared/ui/insta-card/insta-card.component';
import { TableComponent } from '../../shared/ui/table/table.component';

@Component({
  selector: 'app-creator-info',
  standalone: true,
  imports: [
    TableComponent,
    ButtonToggleComponent,
    InstaCardComponent,
    CommonModule,
  ],
  templateUrl: './creator-info.component.html',
  styleUrl: './creator-info.component.css',
})
export class CreatorInfoComponent implements OnInit {
  id!: number;
  creatorInfo!: any;
  date_range: number = 15;
  date_buttons = [
    { name: '15d', value: 15 },
    { name: '30d', value: 30 },
    { name: '45d', value: 45 },
    { name: '60d', value: 60 },
    { name: '90d', value: 90 },
    { name: '120d', value: 120 },
    { name: 'All', value: 0 },
  ];
  columns = [
    'content',
    'collaborations',
    'mediaType',
    'likes',
    'views',
    'comments',
    'tags',
    // 'platform',
    'publishedDate',
  ];
  private route = inject(ActivatedRoute);
  media: any = [];
  constructor(private creatorService: CreatorService) {}
  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('creator_id')!);
    this.getCreatorInfo();
  }
  async getCreatorInfo() {
    this.creatorInfo = await this.creatorService.creatorInfo({
      creator_id: this.id,
      date_range: this.date_range,
    });
    const { collaoboratorsMedia: media } = this.creatorInfo;
    this.media = media.map((cm: any) => {
      const {
        publishedDate,
        likes,
        comments,
        collaborators,
        views,
        caption,
        mediaType,
        tags,
        content,
      } = cm.media;

      let collaborations = collaborators.map((e: any) => e.creator);
      return {
        content,
        collaborations,
        mediaType,
        likes: extractNumber(likes || ''),
        actual_likes: likes,
        comments: extractNumber(comments || ''),
        actual_comments: comments,
        views: extractNumber(views || ''),
        actual_views: views,
        tags,
        // caption,
        // platform,
        publishedDate,
      };
    });
  }

  changeDateRange(value: any) {
    this.date_range = value;
    this.getCreatorInfo();
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
