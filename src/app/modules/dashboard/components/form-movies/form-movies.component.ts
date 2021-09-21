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
      this.action = params['action'] || undefined;
      this.indexMov = params['indexMov'];
      this.getOneMovie = this.fireServ.getOneMovie(this.indexMov);
      this.getOneMovie.subscribe(movie => this.movie = movie, movError => console.log('movError :>> ', movError));
    });
  }

  onSubmit(f: NgForm) {

    const mov:Movies =  {
      cartelera: f.value.cartelera,
      descripcion: f.value.descripcion,
      idioma: f.value.idioma,
      imagen: f.value.imagen,
      likes: f.value.likes,
      nombre: f.value.nombre,
      trailer: f.value.trailer
    }
    
    this.fireServ.editMovie(this.indexMov, mov).subscribe(res => console.log('editMovie() res :>> ', res));

    console.log(mov);  // { first: '', last: '' }
    //console.log(f.valid);  // false
  }

}
