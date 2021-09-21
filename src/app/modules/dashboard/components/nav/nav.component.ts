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
  nroRnd: number = 0;
  iconsNav: any[] = []


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private fireService: FirebaseService, private auth: AuthService) { }

  ngOnInit(): void {
    this.fireService.getMovies().then((snapshot) => {
      if (snapshot.exists()) {
        console.log('snapshot.val()',);
        this.movies = Object.values(snapshot.val());
        this.enCartelera = this.movies.length
        this.navbarNotificatios();

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  singOut() {
    this.auth.singOutUser();
  }

  navbarNotificatios() {

    this.iconsNav.push({ icon: 'movie_filter', nroNot: this.movies.length });
    this.iconsNav.push({ icon: 'email', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'insert_comment', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'forward_to_inbox', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'phone', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'markunread_mailbox', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'settings', nroNot: parseInt((Math.random() * 100).toString()) });
    this.iconsNav.push({ icon: 'person', nroNot: null });
  }
}
