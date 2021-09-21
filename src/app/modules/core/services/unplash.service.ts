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

  getImages(orientation?:string) {
    const params = new HttpParams()
      .set('client_id', this.ak)
      .set('query', 'movie')
      .set('lang', 'en')
      .set('orientation', `${!orientation?'landscape':orientation}`);
    return this.http.get(`${this.url}/search/photos`, { params })
  }

  getCollections() {
    const params = new HttpParams()
      .set('client_id', this.ak)
    return this.http.get(`${this.url}/collections`, { params })
  }

  getStaticsPhoto(id:string) {
    const params = new HttpParams()
      .set('client_id', this.ak);

    return this.http.get(`${this.url}/photos/${id}/statistics`, { params });
  }
}
