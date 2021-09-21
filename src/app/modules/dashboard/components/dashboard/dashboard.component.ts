import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';
import { Movies } from 'src/app/modules/core/interfaces/movies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  getMovies: Observable<Movies[]> = new Observable();
  getMovie: Observable<Movies> = new Observable();
  movies: Movies[] = [];

  cards: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fireServ: FirebaseService
  ) { }

  ngOnInit(): void {
    this.getMovies = this.fireServ.getMovies();
    this.getMovies.subscribe(mvs => this.movies = mvs, mvsErr => console.log('mvsErr :>> ', mvsErr));

  }

}
