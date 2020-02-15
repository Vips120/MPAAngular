import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegisterServices } from 'src/app/shared/services/register';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public tokenId;
  constructor(private AR: ActivatedRoute, private router: Router, private fb: FormBuilder, private registerServices: RegisterServices) { }

  public passwordUpdate: FormGroup;
  public submitted: boolean = false;
  public showErrorMessage: string;
  ngOnInit() {
    this.passwordUpdate = this.fb.group({
      "UserLogin": this.fb.group({
        "Password": ["", Validators.required]
      })
    });
    this.AR.params.subscribe(data => {
     return this.tokenId = data['id'];
    })
  };

  Save(data) {
    this.submitted = true;
    if (!this.passwordUpdate.valid) { return; }
    this.registerServices.forgotPassword(this.tokenId, data)
      .subscribe(item => {
        alert("Password Updated");
        console.log(item);
        this.router.navigateByUrl("/login");
      },
        (ex) => {
          this.showErrorMessage = ex.error.message;
        }
      );
  }

}
