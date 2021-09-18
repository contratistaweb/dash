import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnplashService } from 'src/app/modules/core/services/unplash.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
getPhotos: Observable<Object> = new Observable();
  photos: Object | any;

  constructor(private unplash: UnplashService) {  }
  

  ngOnInit(): void {
    this.getPhotos = this.unplash.getImages();
    this.getPhotos.subscribe((ph:any) => this.photos = ph.results);

  }

  ngOnDestroy(): void {
    this.getPhotos.subscribe().unsubscribe();
  }
}
