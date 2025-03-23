import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  private url = 'api/getData' ;
  private postUrl = 'api/postData' ;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl+this.url);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+this.postUrl, data);
  }
}