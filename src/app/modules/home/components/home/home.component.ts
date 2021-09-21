import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  getMovies: Observable<Movies[]> = new Observable();
  movies: Movies[] = [];

  constructor(
    private fireService: FirebaseService
  ) { }

  ngOnInit(): void {

    this.getMovies = this.fireService.getMovies();
    this.getMovies.subscribe(movs => {
      this.movies = movs
      console.log('Movies: \n', this.movies);
    }, movsErr => console.log('movErr :>> ', movsErr));
  }

  ngOnDestroy(): void {
    this.getMovies.subscribe().unsubscribe();
  }
}
