import { Routes } from '@angular/router';
import { AppInfoComponent } from './components/app-info/app-info.component';
import { CreatorInfoComponent } from './components/creator-info/creator-info.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AnalysisComponent } from './layout/analysis/analysis.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AnalysisComponent,
        data: { breadcrumb: 'Analysis' },
      },
      {
        path: 'app-info/:app_id',
        component: AppInfoComponent,
        data: { breadcrumb: 'App Detail' },
      },
      {
        path: 'creator-info/:creator_id',
        component: CreatorInfoComponent,
        data: { breadcrumb: 'Creator Detail' },
      },
    ],
  },
  {
    path: 'jobs',
    component: JobsComponent,
    data: { breadcrumb: 'Jobs' },
  },
];
