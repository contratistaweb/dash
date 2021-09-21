import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccessRoutingModule } from '../access/access-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FirebaseService } from './services/firebase.service';
import { UnplashService } from './services/unplash.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CustomService } from './services/custom.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    FirebaseService,
    UnplashService,
    CustomService
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class CoreModule { }