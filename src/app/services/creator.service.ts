import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class CreatorService {
  fetched_creators = [];
  creator_api_url = `${api_url}creator/`;
  constructor(private http: HttpClient) {}

  async creatorList(params = {}) {
    return this.http.get(`${this.creator_api_url}list`, { params }).toPromise();
  }
  async creatorInfo(params = {}) {
    return this.http.get(`${this.creator_api_url}info`, { params }).toPromise();
  }
}
