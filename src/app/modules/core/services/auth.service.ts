import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config = environment.firebaseConfig;
  user!: User;
  app = initializeApp(this.config);

  isUserLogin: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {

  }

  registerUser(email: string, password: string) {

    const auth = getAuth(this.app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.user = user;
        console.log('authUser() user :>> ', this.user);
        this.isUserLogin = false;
        this.toastr.success('User create correctly!', 'Success!');
        this.router.navigate(['/access/login']);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.error(error.message, 'Error!');
        console.log('error createUserWithEmailAndPassword():>> \n', error);
        // ..
      });
  }
  // accessToken, displayName, phoneNumber
  authUser(email: string, password: string) {
    const auth = getAuth(this.app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        console.log('authUser() user :>> ', this.user);
        this.isUserLogin = true;
        console.log('this.isUserLogin :>> ', this.isUserLogin);
        this.toastr.success('Welcome!', 'Success!');
        this.router.navigate(['/dashboard/']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.error(error.message, 'Error!');
        console.log('error signInWithEmailAndPassword() :>> \n', error);
      });
  }

  singOutUser() {
    const auth = getAuth(this.app);
    signOut(auth).then(() => {
      // Sign-out successful.
      this.isUserLogin = false;
      console.log('this.isUserLogin :>> ', this.isUserLogin);
      this.toastr.success('come back soon!', 'Success!');
      this.router.navigate(['/access/login']);
    }).catch((error) => {
      // An error happened.
      console.log('error signOut() :>> \n', error);
      this.toastr.error(error.message, 'Error!');
    });
  }


}
