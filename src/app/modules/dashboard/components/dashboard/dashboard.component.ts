import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';
import { Movies } from 'src/app/modules/core/interfaces/movies';
import { ToastrService } from 'ngx-toastr';
import { push } from '@firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  getMovies: Observable<Movies[]> = new Observable();
  getMovie: Observable<Movies> = new Observable();
  movies: any[] = [];
  ids: any[] = [];

  cards: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fireService: FirebaseService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  // convertir esto para que vote un array  y no un obj
  ngOnInit(): void {

    this.getInit();
  }

  getInit() {
    this.fireService.getMovies().then((snapshot) => {
      if (snapshot.exists()) {
        // this.movies = snapshot.toJSON();
        Object.keys(snapshot.val()).forEach(el => {
          this.movies.push(snapshot.val()[el]);
          this.ids.push(el);
        });
        console.log('this.movies', this.movies);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  updateMovie(i: number) {
    console.log('this.ids[i] :>> ', this.ids[i]);
    this.router.navigate([`/dashboard/form-movies/update/${this.ids[i]}`]);
  }


  deleteMovie(i: number) {
    console.log('this.ids[i] :>> ', this.ids[i]);
    this.fireService.deleteMovie(this.ids[i]).then(() => {
      this.toastr.success('Movie Deleted correctly!', 'Success!');
      this.getInit()
    });
  }

}
