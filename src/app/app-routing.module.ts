import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationStart, BaseRouteReuseStrategy } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { LoggedInAuthService } from './shared/services/logged-in-auth.service';

const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: '', redirectTo: '/landing', pathMatch : 'full'},
  {path: 'login', component: LoginComponent, canActivate:[LoggedInAuthService]},
  {path: 'register', component: RegisterComponent},
  {path: 'list-manager', component: ListManagerComponent, canActivate:[AuthGuardService]},
  // { path: 'list-manager', component: ListManagerComponent , canActivate: [AuthGuardService],},
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
