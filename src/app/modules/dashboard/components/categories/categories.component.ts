import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  getMovies: Observable<Movies[]> = new Observable();
  movies: Movies[] = [];

  cards: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fireService: FirebaseService) { }

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

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
