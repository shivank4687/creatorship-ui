import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SearchComponent } from '../../shared/ui/search/search.component';
import { TableComponent } from '../../shared/ui/table/table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const JOB_COLUMNS: any = {
  app: ['id', 'app', 'type', 'status', 'runCount', 'jobMode', 'time_consumed'],
  creator: [
    'id',
    'creator',
    'type',
    'status',
    'postsScraped',
    'runCount',
    'postslimit',
    'jobMode',
    'time_consumed',
  ],
  media: [
    'id',
    'creator',
    'type',
    'status',
    'postsScraped',
    'runCount',
    'postslimit',
    'jobMode',
    'time_consumed',
  ],
};

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    TableComponent,
    SearchComponent,
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  fetched_jobs: any = { app: [], creator: [], media: [] };
  search_query = '';
  type: any = 'app';
  jobs: any = [];
  all_jobs: any = [];
  table_updates: any = null;
  columns: any = [];

  constructor(private jobService: JobsService) {}

  ngOnInit() {
    Object.keys(JOB_COLUMNS).forEach((type) => {
      if (localStorage.getItem('action_code') == 'job') {
        JOB_COLUMNS[type].push('action');
      }
    });
    this.columns = JOB_COLUMNS['app'];
    this.getJobs();
  }
  ngOnChanges(changes: SimpleChanges): void {}

  async getJobs() {
    try {
      let jobs: any = this.fetched_jobs[this.type];
      if (!jobs.length) {
        jobs = await this.jobService.jobsList({ type: this.type });
        this.fetched_jobs[this.type] = jobs;
      }

      this.columns = JOB_COLUMNS[this.type];
      this.all_jobs = jobs;
      this.jobs = jobs;
    } catch (ex) {
      console.log(ex);
    }
  }

  async runJob(job: any) {
    try {
      const updated_job: any = await this.jobService.runJob({
        ...job,
        type: this.type,
      });
      if (updated_job.length) {
        this.table_updates = updated_job[0];
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  performAction(event: any) {
    const { action, data } = event;
    this.runJob({ id: data.id });
  }

  applySearch(event: any) {
    let search_query = event;
    this.search_query = event;
    this.jobs = this.all_jobs.filter((job: any) => {
      const query = search_query.toLowerCase();
      if (this.type == 'app') {
        return (
          job.type.toLowerCase().includes(query) ||
          job.status.toLowerCase().includes(query) ||
          job.app?.name.toLowerCase().includes(query)
        );
      }
      if (job.creator?.username.toLowerCase().includes(query)) {
        return true;
      }
      return (
        job.type.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query)
      );
    });
  }

  changeType(event: any) {
    this.search_query = '';
    this.getJobs();
  }
}
