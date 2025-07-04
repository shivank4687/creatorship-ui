import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { api_url } from '../../../../environment';
import { NumberFormatterPipe } from '../../pipes/number-formatter.pipe';
import { isProduction, client_url } from '../../../../environment';
@Component({
  selector: 'app-insta-card',
  standalone: true,
  imports: [RouterLink, CommonModule, NumberFormatterPipe],
  templateUrl: './insta-card.component.html',
  styleUrl: './insta-card.component.css',
})
export class InstaCardComponent {
  client_asset_url = client_url;
  server_url = api_url.slice(0, -1);
  @Input() showHeader: boolean = true;
  @Input() scraped: any = 0;
  @Input() detail_page: any = false;
  @Input() creator: any;
  @Input() width: number = 280;
  constructor(private router: Router) {}

  openCreator() {
    if (this.detail_page) {
      return;
    }
    this.router.navigate(['/creator-info', this.creator.id]);
  }
  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }
}
