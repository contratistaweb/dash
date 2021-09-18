import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnplashService {

  ak = environment.unplash.accesskey;
  url = environment.unplash.url;
  constructor(private http: HttpClient) { }

  getImages(){
    const params = new HttpParams()
    .set('client_id', this.ak)
    .set('query', 'tech')
    .set('lang', 'en')
    .set('orientation', 'landscape');
    return this.http.get(`${this.url}/search/photos`, {params})
  }
  
  getCollections(){
    const params = new HttpParams()
    .set('client_id', this.ak)
    return this.http.get(`${this.url}/collections`, {params})
  }
}