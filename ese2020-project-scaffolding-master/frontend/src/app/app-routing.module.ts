import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'register', component: UserRegistrationComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'profile/:userName', component: ProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
