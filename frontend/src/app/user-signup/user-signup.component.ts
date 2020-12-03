import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserSignupService} from '../user-signup.service'

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  registerForm:FormGroup;
  coachId:string;
  errorMessage:string="";
  formDisplay:boolean=true;
  constructor(private formBuilder:FormBuilder,private userSignupService:UserSignupService,private route:Router) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',[Validators.required,validateName]],
      password:['',[Validators.required,validatePassword]],
      gender:['',[Validators.required]],
      dateOfBirth:['',[Validators.required,validateDob]],
      mobileNumber:['',[Validators.required,validateMobile]],
      email:['',Validators.required],
      pincode:['',[Validators.required,validatePincode]],
      city:['',[Validators.required,validateCity]],
      state:['',[Validators.required,validateState]],
      country:['',[Validators.required,validateCountry]]
    });
  }
  submit(){
    this.userSignupService.userregister(this.registerForm.value).subscribe(
      res=>{
        this.coachId=res.message;
        this.errorMessage="";
        this.formDisplay=false;
      },
      err=>{
        this.errorMessage=err;
        this.formDisplay=true;
      }
    )
  }
  loginuser(){
    this.route.navigate(['/userlogin']);
  }

}
function validateCity(c:FormControl){
  return (c.value.length>5&&c.value.length<21)?null:{
    cityInValid:{
      message:"City should have 6 to 20 characters"
    }
  }
}
function validateState(c:FormControl){
  return (c.value.length>5&&c.value.length<21)?null:{
    stateInValid:{
      message:"State should have 6 to 20 characters"
    }
  }
}
function validateCountry(c:FormControl){
  return (c.value.length>5&&c.value.length<21)?null:{
    countryInValid:{
      message:"Country should have 6 to 20 characters"
    }
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
  function validatePincode(c:FormControl){
    return(c.value.length==6)?null:{
      pinInValid:{
        message:"Pincode should have 6 digits"
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
    return (age>19&&age<101)?null:{
      dobInValid:{
        message:"Age should be between 20 and 100 years"
      }
    }
  }
