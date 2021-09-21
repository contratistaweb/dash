import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // getMovies: Observable<Movies[]> = new Observable();
  getMovies!: { subscribe: () => { (): any; new(): any; unsubscribe: { (): void; new(): any; }; }; };
  movies: Movies[] = [];

  constructor(
    private fireService: FirebaseService
  ) { }

  ngOnInit(): void {

    this.fireService.getMovies().then((snapshot) => {
      if (snapshot.exists()) {
        console.log('snapshot.val()',);
        this.movies = Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
