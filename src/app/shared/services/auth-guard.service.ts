import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  // declare a variable 'routeURL'
  // to keep track of current active route
  routeURL: string;

  constructor(private authService: AuthService, private router: Router) {
    // initialize 'routeURL' with current route URL
    this.routeURL = this.router.url;
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
   
    return new Promise((resolve, reject) => {
      this.authService.user.subscribe((user) => {
        
        if (!user && this.routeURL !== '/login') {
        
          this.routeURL = '/login';
        
          this.router.navigate(['/login'], {
            
            queryParams: {
              return: 'login'
            }
          });
          return resolve(false);
        } else {
          // re-assign current route URL to 'routeURL'
          // when the user is logged in
          this.routeURL = this.router.url;
          // just return true - if user is logged in
          return resolve(true);
        }
      });
    });
  }
}
