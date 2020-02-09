import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Iregister } from 'src/app/shared/model/register';
import { RegisterServices } from 'src/app/shared/services/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userRegister: FormGroup;
  public submitted: boolean = false;
  public showErrorMessage: string;
  constructor(private fb: FormBuilder, private registerServices:RegisterServices,private router: Router) { }

  ngOnInit() {
    this.userRegister = this.fb.group({
      "firstname": ["", Validators.required],
      "lastname": ["", Validators.required],
      "address": ["", Validators.required],
      "UserLogin": this.fb.group({
        "EmailId": ["", Validators.required],
        "Password" : ["", Validators.required]
      })
    })
  };

  Save(data: Iregister) {
    this.submitted = true;
    if (!this.userRegister.valid) { return; }
    this.registerServices.UserRegistration(data)
      .subscribe(item => {
        alert("Registration Done");
        this.router.navigateByUrl("/login");
      },
        (ex) => {
          this.showErrorMessage = ex.error.message;
        }
      );
  }

}
