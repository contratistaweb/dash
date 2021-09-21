import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnplashService } from 'src/app/modules/core/services/unplash.service';
declare const $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  getPhotos: Observable<Object> = new Observable();
  photos: any[] | undefined;

  constructor(private unplashServ: UnplashService) { }


  ngOnInit(): void {
    $('.carousel').carousel()
    this.getPhotos = this.unplashServ.getImages();
    this.getPhotos.subscribe((ph: any) => {
      this.photos = ph.results;
      console.log('this.photos :>> ', this.photos);
    });

  }

  ngOnDestroy(): void {
    this.getPhotos.subscribe().unsubscribe();
  }
}
