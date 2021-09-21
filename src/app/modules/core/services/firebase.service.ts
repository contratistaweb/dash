import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from '../interfaces/movies';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  url = `${environment.urlDB}`;
  apiUrl = environment.API;

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movies[]>(`${this.apiUrl}/Peliculas.json`);
  }
  getOneMovie(id:string) {
    return this.http.get<Movies>(`${this.apiUrl}/Peliculas/${id}.json`);
  }

  editMovie(id:string, f: Movies){
    
    const body: Movies = {
      nombre: f.nombre,
      cartelera: f.cartelera,
      descripcion: f.descripcion,
      idioma: f.idioma,
      imagen: f.imagen,
      likes: f.likes,
      trailer: f.trailer
    }
    return this.http.put<Movies>(`${this.apiUrl}/Peliculas/${id}.json`, JSON.stringify(body));
  }

  getData() {
    return this.http.get<User[]>(`${this.url}/users.json`);
  }
}
