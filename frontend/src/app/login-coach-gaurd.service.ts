import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CoachLoginService} from './coach-login.service';
@Injectable({
  providedIn: 'root'
})
export class LoginCoachGaurdService implements CanActivate{

  constructor(private router:Router,private coachLoginService:CoachLoginService) { }
  canActivate():boolean{
    if(this.coachLoginService.logged){
      return true;
    }
    this.router.navigate(['/coachlogin']);
    return false;
  }
}
