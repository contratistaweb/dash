import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  getMovies: Observable<Movies[]> = new Observable();
  movies: Movies[] = [];
  enCartelera: number = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fireServ: FirebaseService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getMovies = this.fireServ.getMovies();
    this.getMovies.subscribe(mvs => {
      this.movies = mvs;
      this.enCartelera = this.movies.filter(el => el.cartelera == true).length;
    }, mvsErr => console.log('mvsErr :>> ', mvsErr));
  }

  singOut() {
    this.auth.singOutUser();
  }
}
