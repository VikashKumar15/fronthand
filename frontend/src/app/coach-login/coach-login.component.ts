import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {CoachLoginService} from '../coach-login.service'

@Component({
  selector: 'app-coach-login',
  templateUrl: './coach-login.component.html',
  styleUrls: ['./coach-login.component.css']
})
export class CoachLoginComponent implements OnInit {

  loginForm:FormGroup;
  errorMsg:string="";
  constructor(private formBuilder:FormBuilder,private coachLoginService:CoachLoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      id:['',validateId],
      password:['',validatePassword]
    })
  }
  submit(){
    const user=this.loginForm.get("id").value;
    this.coachLoginService.coachlogin(this.loginForm.value).subscribe(
      res=>{
        console.log(res);
        this.errorMsg='';
        if(res){
          localStorage.setItem("userId",user);
          this.router.navigate(["/coachhome"]);
        }
      },
      err=>{
       this.errorMsg=err;
      }
    )

  }

}

function validateId(c:FormControl){
  return(c.value.length>0)?null:{
    idInValid:{
      message:"Coach Id is a mandatory field"
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