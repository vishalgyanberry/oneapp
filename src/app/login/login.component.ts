import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginform!:FormGroup

  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router){


  }

  ngOnInit(): void {

    this.loginform = this.formbuilder.group({

      email:['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['', [Validators.required, Validators.minLength(6)]],

    })

  }

  get registerFormControl() {
    return this.loginform.controls;
  }

   login(){

    alert('test');
    this.http.get<any>("http://localhost:8000/signupusers")
    .subscribe(res=>{

     const user = res.find((a:any)=>{

      return a.email === this.loginform.value.email  && a.password === this.loginform.value.password;

     });

     if(user){

      alert('successfull login');
      this.router.navigate(['dashboard']);
     }
     else{

      alert('user not found');

     }

    },err=>{

      alert('something went wrong');
    })

   }
}
