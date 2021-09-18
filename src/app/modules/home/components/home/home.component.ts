import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/core/interfaces/user';
import { FirebaseService } from 'src/app/modules/core/services/firebase.service';
import { UnplashService } from 'src/app/modules/core/services/unplash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: User[] | undefined;
  getPhotos: Observable<Object> = new Observable();
  getCollections: Observable<Object> = new Observable();
  photos: any;
  collections: any;

  constructor(
    private fireService: FirebaseService,
    private unplash: UnplashService
  ) { }

  ngOnInit(): void {
    this.getPhotos = this.unplash.getImages();
    this.fireService.getData().subscribe(dataObj => this.data = dataObj, err => console.log('err :>> ', err));
    this.getPhotos.subscribe((pts: any) => {
      this.photos = pts.results;
      console.log('pts :>> ', pts);
    }, (err: any) => console.log('err :>> ', err));
    console.log('on init this.getPhotos :>> \n', this.getPhotos);
    this.getCollections = this.unplash.getCollections();
    this.getCollections.subscribe((col: any) => {
      this.collections = col;
      console.log('col :>> ', col);
    }, (err: any) => console.log('err :>> ', err));
    console.log('on init this.getPhotos :>> \n', this.getPhotos);
  }

  ngOnDestroy(): void {
    this.getPhotos.subscribe().unsubscribe();
    console.log('on destroy this.getPhotos :>> \n', this.getPhotos);
    this.getCollections.subscribe().unsubscribe();
    console.log('on destroy this.getCollections :>> \n', this.getPhotos);
  }
}
