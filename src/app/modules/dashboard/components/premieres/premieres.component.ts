import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.component.html',
  styleUrls: ['./premieres.component.scss']
})
export class PremieresComponent implements OnInit {

  getMovies: Observable<Movies[]> = new Observable();
  movies: Movies[] = [];

  cards: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fireServ: FirebaseService) { }

  ngOnInit(): void {
    this.getMovies = this.fireServ.getMovies();
    this.getMovies.subscribe(mvs => this.movies = mvs.filter(el => el.cartelera==false), mvsErr => console.log('mvsErr :>> ', mvsErr));
  }

}
