import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  fetched_apps: any = {};
  app_api_url = `${api_url}appstore/`;
  constructor(private http: HttpClient) {}

  async appsList(params: any = {}) {
    return this.http.get(`${this.app_api_url}list`, { params }).toPromise();
  }
  async appInfo(params: any = {}) {
    return this.http.get(`${this.app_api_url}info`, { params }).toPromise();
  }
}
