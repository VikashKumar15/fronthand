import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {CoachsignupService} from '../coachsignup.service';

@Component({
  selector: 'app-coach-signup',
  templateUrl: './coach-signup.component.html',
  styleUrls: ['./coach-signup.component.css']
})
export class CoachSignupComponent implements OnInit {

  registerForm:FormGroup;
  coachId:string;
  errorMessage:string="";
  formDisplay:boolean=true;

  constructor(private formBuilder:FormBuilder,private coachSignupService:CoachsignupService,private route:Router) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',[Validators.required,validateName]],
      password:['',[Validators.required,validatePassword]],
      gender:['',[Validators.required]],
      dateOfBirth:['',[Validators.required,validateDob]],
      mobileNumber:['',[Validators.required,validateMobile]],
      speciality:['',[Validators.required,validateSpeciality]]
    });
  }

  submit(){
    this.coachSignupService.coachregister(this.registerForm.value).subscribe(
      res=>{
        this.coachId=res.message;
        this.formDisplay=false;
        this.errorMessage=""
      },
      err=>{
        this.errorMessage=err;
        this.formDisplay=true;
        console.log(this.errorMessage);
      }
    )
  
  }
  logincoach(){
    this.route.navigate(['/coachlogin']);
  }
}

function validateName(c:FormControl){
return (c.value.length>2&&c.value.length<51)?null:{
  nameInValid:{
    message:"Name should have 3 to 50 characters"
  }
}
}

function validatePassword(c:FormControl){
  return (c.value.length>4&&c.value.length<11)?null:{
    passwordInValid:{
      message:"Password should have 5 to 10 characters"
    }
  }
}

function validateMobile(c:FormControl){
  return(c.value.length==10)?null:{
    mobileInValid:{
      message:"Mobile Number should have 10 digits"
    }
  }
}
function validateSpeciality(c:FormControl){
  return(c.value.length>9&&c.value.length<51)?null:{
    specialityInValid:{
      message:"Speciality should have 10 to 50 characters"
    }
  }
}
function validateDob(c:FormControl){
  let diff_ms = Date.now() - new Date(c.value).getTime();
  let age_dt = new Date(diff_ms); 
  let age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return (age>20&&age<101)?null:{
    dobInValid:{
      message:"Age should be between 20 and 100 years"
    }
  }
}