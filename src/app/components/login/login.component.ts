import { Component, OnInit } from '@angular/core';
import { Ilogin } from 'src/app/shared/model/register';
import {Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegisterServices } from 'src/app/shared/services/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userLogin: FormGroup;
  public submitted: boolean = false;
  public showErrorMessage: string;
  constructor(private fb: FormBuilder, private registerServices:RegisterServices,private router: Router) { }

  ngOnInit() {
    this.userLogin = this.fb.group({
      "UserLogin": this.fb.group({
        "EmailId": ["", Validators.required],
        "Password" : ["", Validators.required]
      })
    })
  };

  Save(data: Ilogin) {
    this.submitted = true;
    if (!this.userLogin.valid) { return; }
    this.registerServices.UserLogin(data)
      .subscribe(item => {
        alert("Login Done");
        console.log(item);
        this.router.navigateByUrl("/home");
      },
        (ex) => {
          this.showErrorMessage = ex.error.message;
        }
      );
  }
}
