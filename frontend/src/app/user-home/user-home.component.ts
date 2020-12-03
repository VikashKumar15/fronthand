import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import {UserHomeService} from '../user-home.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  coachArray;
  userDetails;
  appointmentDetails;
  appointmentForm:FormGroup;
  rescheduleForm:FormGroup;
  home:boolean=false;
  profile:boolean=false;
  schedules:boolean=false;
  newbooking:boolean=false;
  reschedulebooking:boolean=false;
  bookingsuccess:boolean=false;
  bookingreschedule:boolean=false;
  deletesuccess:boolean=false;
  noschedules:boolean=false;
  constructor(private userHomeService:UserHomeService,private router:Router,private formBuilder:FormBuilder) {
    this.router.events.subscribe((val)=>{
      if(router.url=="/userhome"){
        this.home=true;
      }
      if(router.url=="/userviewprofile"){
        this.profile=true;
      }
      if(router.url=="/userappointments"){
        this.schedules=true;
      }
    })

   }

  ngOnInit(): void {
    this.appointmentForm=this.formBuilder.group({
      DateOfAppointment:['',validateDate],
      Slot:['',Validators.required]
    });
    this.rescheduleForm=this.formBuilder.group({
      DateOfAppointment:['',validateDate],
      Slot:['',Validators.required]
    });
    this.allcoaches();
    this.viewdetails();
    this.appointments();
  }
  allcoaches(){
    this.userHomeService.allcoaches().subscribe(
      res=>{
        this.coachArray=res;
      },
      err=>{
        console.log(err);
      }
    )
  }
  viewdetails(){
    this.userHomeService.viewdetails().subscribe(
      res=>{
        this.userDetails=res;
      },
      err=>{
        console.log(err);
      }
    )
  }
  appointments(){
    this.userHomeService.appointments().subscribe(
      res=>{
        this.appointmentDetails=res;
      },
      err=>{
        console.log(err);
        this.noschedules=true;
      }
    )
  }
  addbooking(id:string){
    this.home=false;
    this.newbooking=true;
    sessionStorage.setItem('coachId',id);
  }
  confirmAppointment(){
    this.userHomeService.confirmAppointment(this.appointmentForm.value).subscribe(
      res=>{
        if(res){
           this.newbooking=false;
           this.bookingsuccess=true;
           this.appointments();
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
  reschedule(id:string){
    this.schedules=false;
    this.reschedulebooking=true;
    sessionStorage.setItem('bookingId',id);
  }
  rescheduleAppointment(){
    this.userHomeService.rescheduleAppointment(this.rescheduleForm.value).subscribe(
      res=>{
        if(res){
           this.reschedulebooking=false;
           this.bookingreschedule=true;
           this.appointments();
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
  cancel(id:string){
    this.schedules=false;
    sessionStorage.setItem('bookingId',id);
    if(confirm("Are you sure you need to cancel the appointment")){
       this.userHomeService.cancel().subscribe(
        res=>{
          if(res){
             this.schedules=false;
             this.deletesuccess=true;
             this.appointments();
          }
        },
        err=>{
          console.log(err);
        }
      )
    }else{
      this.schedules=true;
    }
  }
  tohome(){
    this.router.navigate(['/userhome']);
  }
  goback1(){
    this.bookingsuccess=false;
    this.home=true;
  }
  goback2(){
    this.bookingreschedule=false;
    this.schedules=true;
  }
  goback3(){
    this.deletesuccess=false;
    this.schedules=true;
  }
}

function validateDate(c:FormControl){
  let date1=new Date();
  let date2=new Date();
  date2.setDate(date2.getDate()+7);
  let val=new Date(c.value)
  return (val>date1&&val<=date2)?null:{
    dateInValid:{
      message:"Appointment date should be any upcoming 7 days"
    }
  }
}
