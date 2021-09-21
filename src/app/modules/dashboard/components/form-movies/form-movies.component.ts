import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';

@Component({
  selector: 'app-form-movies',
  templateUrl: './form-movies.component.html',
  styleUrls: ['./form-movies.component.scss']
})
export class FormMoviesComponent implements OnInit {
  getOneMovie!: Observable<Movies>;
  indexMov: string = '';
  action: string = '';
  movie!: Movies;

  constructor(private route: ActivatedRoute, private fireServ: FirebaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.action = params['action'] || null;
      this.indexMov = params['indexMov']||null;
      if (this.action == 'update') {
        this.getOneMovie = this.fireServ.getOneMovie(this.indexMov);
        this.getOneMovie.subscribe(movie => this.movie = movie, movError => console.log('movError :>> ', movError));
      }else{
        this.movie = {
          nombre: '',
          cartelera: false,
          descripcion: '',
          likes: 0,
          idioma: '',
          imagen: '',
          trailer: ''
        }
      }
    });
  }

  actionMov(f: NgForm) {
    if (this.action == 'update') {
      this.updateMovie(f);
    } else {
      this.createMovie(f);
    }
  }

  updateMovie(f: NgForm) {
    this.fireServ.updateMovieData(this.indexMov, f);
  }

  createMovie(f: NgForm) {
    this.fireServ.createNewMovie(f);
  }

}
