import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
  if(firebase.default.auth().currentUser){
    return false
  }
    else{
      this.router.navigate(['/login'])
      return true;
  }
}
}
