import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormMoviesComponent } from './components/form-movies/form-movies.component';
import { GaleryComponent } from './components/galery/galery.component';
import { NavComponent } from './components/nav/nav.component';
import { PremieresComponent } from './components/premieres/premieres.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'main'
      },
      {
        path: 'main',
        component: DashboardComponent
      },
      {
        path: 'premieres',
        component: PremieresComponent
      },
      {
        path: 'galery',
        component: GaleryComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'form-movies/:action/:indexMov',
        component: FormMoviesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
