import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserLoginService} from '../user-login.service'
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMsg:string="";
  logged:boolean=false;
  constructor(private formBuilder:FormBuilder,private userLoginService:UserLoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      id:['',Validators.required],
      password:['',validatePassword]
    })
  }
  submit(){
    const user=this.loginForm.get("id").value;
    this.userLoginService.userlogin(this.loginForm.value).subscribe(
      res=>{
        console.log(res);
        this.errorMsg='';
        if(res){
          localStorage.setItem("userId",user);
          this.logged=true;
          this.router.navigate(["/userhome"]);
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
