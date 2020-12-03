import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CoachHomeService} from '../coach-home.service';
@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.css']
})
export class CoachHomeComponent implements OnInit {

  coachId:string=localStorage.getItem("userId");
  coachDetails;
  imgUrl:string;
  show:boolean=true;
  showList:boolean;
  scheduleDetails;
  msg:string;
  noschedules:boolean=false;
  constructor(private coachHomeService:CoachHomeService,private router:Router) { 
    this.router.events.subscribe((val)=>{
      if(router.url=="/coachhome"||router.url=="/coachschedules"){
        this.show=true;
      }
      else if(router.url=="/coachviewprofile"){
        this.show=false;
      }
    })
  }

  ngOnInit(): void {
    this.schedules();
    this.viewprofile();
  }

  schedules(){
    this.coachHomeService.schedules().subscribe(
      data=>{
        this.scheduleDetails=data;
        console.log(data);
      },
      err=>{
        this.noschedules=true;
        console.log(err);
      }
    )
  }
  viewprofile(){
    this.coachHomeService.viewprofile().subscribe(
      data=>{
        this.coachDetails=data;
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }

}
