import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  logout = false;
  uProfile = false;
  cProfile =false;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.logout = false
      this.uProfile = false
      this.cProfile = false
      if (router.url == "/userhome" || router.url == "/userviewprofile" || router.url=="/userappointments") {
        this.logout = true
        this.uProfile = true
        this.cProfile = false
      }
      else if(router.url == "/coachhome"|| router.url=="/coachviewprofile" || router.url == "/coachschedules"){
        this.logout = true
        this.uProfile =false
        this.cProfile = true
      }
      else{
        this.uProfile = false;
        this.logout = false;
        this.cProfile = false
      }
    })
  }

  logoutFn(){
    localStorage.removeItem('userId')
  }

}
