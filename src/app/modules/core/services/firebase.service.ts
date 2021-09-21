import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movies } from '../interfaces/movies';
import { getDatabase, ref, child, get, set, push, remove, update, onValue } from 'firebase/database';
import { NgForm } from '@angular/forms';
import { initializeApp } from '@firebase/app';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UnplashService } from './unplash.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(environment.firebaseConfig)
  url = `${environment.urlDB}`;
  apiUrl = environment.API;
  movie!: Movies;
  bookDoc: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private unplash: UnplashService) { }

  getMovies() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `Peliculas/`))
    // return this.http.get<Movies[]>(`${this.apiUrl}/Peliculas.json`);
  }
  getOneMovie(id: string) {
    return this.http.get<Movies>(`${this.apiUrl}/Peliculas/${id}.json`);
  }

  createNewMovie(f: NgForm) {
    const db = getDatabase();
    this.unplash.getImages('portrait').subscribe((img: any) => {
      // A post entry.
      const movie: Movies = {
        cartelera: f.value.cartelera,
        descripcion: f.value.descripcion,
        idioma: f.value.idioma,
        imagen: img.results[0].urls.small,
        likes: 0,
        nombre: f.value.nombre,
        trailer: img.results[0].urls.full
      };

      // Get a key for a new Post.
      const newPostKey = push(child(ref(db), 'Peliculas')).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates: any = {};
      updates['/Peliculas/' + newPostKey] = movie;
      this.toastr.success('Movie created correctly!', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/dashboard/'])
        return update(ref(db), updates);
      }, 2000);
    })

  }

  updateMovieData(movieId: string, f: NgForm) {
    const db = getDatabase(this.app);
    set(ref(db, 'Peliculas/' + movieId), {
      cartelera: f.value.cartelera,
      descripcion: f.value.descripcion,
      idioma: f.value.idioma,
      imagen: f.value.imagen,
      likes: f.value.likes,
      nombre: f.value.nombre,
      trailer: f.value.trailer
    }).then(() => {

      this.toastr.success('Movie updated correctly!', 'Success!');
      setTimeout(() => {
        this.router.navigate(['/dashboard/'])
      }, 2000);
      console.log('set Update');
    });
  }


  deleteMovie(movieId: string) {
    const db = getDatabase(this.app);
    return remove(ref(db, 'Peliculas/' + movieId))
  }
}
