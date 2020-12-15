// auth.service.ts
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FireService } from './fire.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,
              private afs: FireService
    ) {
    this.user = firebaseAuth.authState;
  }

  signup(name:string, email: string, password: string) {
    console.log('Entering SignUp')
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.afs.createUser(value.user.uid,name,email,password);
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {});
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
  
  loggedIn(): boolean{
  return true;
  }
}