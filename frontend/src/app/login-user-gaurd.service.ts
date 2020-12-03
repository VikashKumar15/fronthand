import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserLoginService} from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUserGaurdService implements CanActivate {

  constructor(private userLoginService:UserLoginService,private router:Router) { }

  canActivate():boolean{

      if(this.userLoginService.logged){
        return true;
      }
      this.router.navigate(['/userlogin']);
      return false;
  }
}
