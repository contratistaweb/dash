import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  getPhotos: Observable<Object> = new Observable();
  movies: any;

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

}