import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class JobsService {
  jobs_api_url = `${api_url}jobs/`;
  constructor(private http: HttpClient) {}

  async jobsList(params = {}) {
    return this.http.get(`${this.jobs_api_url}list`, { params }).toPromise();
  }
  async runJob(params: any = {}) {
    params = { ...params, initial: '1' };
    return this.http.get(`${this.jobs_api_url}run`, { params }).toPromise();
  }
}
