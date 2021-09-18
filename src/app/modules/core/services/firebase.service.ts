import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  url = `${environment.urlDB}`;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<User[]>(`${this.url}/users.json`);
  }
}
