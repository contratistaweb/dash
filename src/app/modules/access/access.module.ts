import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreModule } from '../core/core.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ]
})
export class AccessModule { }
