import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(f: NgForm) {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(f.value.email)) {
      if (f.value.password1 == f.value.password2) {
        // campos coinciden
        this.auth.registerUser(`${f.value.email}`, `${f.value.password1}`)
      } else {
        console.log('Passwords not match');
      }
    } else {
      // email no valido 
    }
    console.log('f :>> \n', f.value);

  }

}
