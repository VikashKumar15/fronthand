import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logincoach(){
    this.route.navigate(['/coachlogin']);
  }
  joincoach(){
    this.route.navigate(['/coachsignup']);
  }
  loginuser(){
    this.route.navigate(['/userlogin']);
  }
  joinuser(){
    this.route.navigate(['/usersignup']);
  }

}
