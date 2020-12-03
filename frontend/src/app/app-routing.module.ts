import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoachHomeComponent } from './coach-home/coach-home.component';
import { CoachLoginComponent } from './coach-login/coach-login.component';
import { CoachSignupComponent } from './coach-signup/coach-signup.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {LoginUserGaurdService} from './login-user-gaurd.service';
import {LoginCoachGaurdService} from './login-coach-gaurd.service';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"coachsignup",component:CoachSignupComponent},
  {path:"coachlogin",component:CoachLoginComponent},
  {path:"usersignup",component:UserSignupComponent},
  {path:"userlogin",component:UserLoginComponent},
  {path:"coachhome",component:CoachHomeComponent,canActivate:[LoginCoachGaurdService]},
  {path:"coachschedules",component:CoachHomeComponent,canActivate:[LoginCoachGaurdService]},
  {path:"coachviewprofile",component:CoachHomeComponent,canActivate:[LoginCoachGaurdService]},
  {path:"userhome",component:UserHomeComponent,canActivate:[LoginUserGaurdService]},
  {path:"userviewprofile",component:UserHomeComponent,canActivate:[LoginUserGaurdService]},
  {path:"userappointments",component:UserHomeComponent,canActivate:[LoginUserGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
