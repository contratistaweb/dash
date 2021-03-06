import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { CoreModule } from '../core/core.module';
import { GaleryComponent } from './components/galery/galery.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PremieresComponent } from './components/premieres/premieres.component';
import { FormMoviesComponent } from './components/form-movies/form-movies.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [DashboardComponent, NavComponent, GaleryComponent, CategoriesComponent, PremieresComponent, FormMoviesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ]
})
export class DashboardModule { }
