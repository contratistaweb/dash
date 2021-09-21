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
  photos: any;

  cards: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fireServ: FirebaseService) { }

  ngOnInit(): void {
    this.getPhotos = this.fireServ.getMovies();
    this.getPhotos.subscribe(mvs => this.photos = mvs, mvsErr => console.log('mvsErr :>> ', mvsErr));
  }

}