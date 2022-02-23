import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !:FormGroup;
  constructor(private formBuilder : FormBuilder, private http:HttpClient, private router:Router){}



  ngOnInit(): void {


     
    this.signupForm=this.formBuilder.group({
      fullname:['',Validators.required,Validators.minLength(6)],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile:['',[Validators.required, Validators.minLength(6)]]

    })
  }

  signUp(){

    this.http.post<any>("http://localhost:8000/signupusers",this.signupForm.value)
    .subscribe(res=>{

      alert('success');
      this.router.navigate(['login']);

    },err=>{

      alert('something went wrong');
    }
    
    )

  }

  get registerFormControl() {
    return this.signupForm.controls;
  }

  // get user(){

  //   return this.signupForm.get('fullname');
  // }

  // get useremail(){

  //   return this.signupForm.get('email');
  // }

  // get usermobile(){

  //   return this.signupForm.get('mobile');
  // }

  // get userpassword(){

  //   return this.signupForm.get('password');
  // }


}
