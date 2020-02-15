import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegisterServices } from 'src/app/shared/services/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css']
})
export class SendmailComponent implements OnInit {
  public sendMail: FormGroup;
  public submitted: boolean = false;
  public showErrorMessage: string;
  constructor(private fb: FormBuilder, private registerServices:RegisterServices,private router: Router) { }

  ngOnInit() {
    this.sendMail = this.fb.group({
      "UserLogin": this.fb.group({
        "EmailId": ["", Validators.required]
      })
    })
  };

  Save(data: any) {
    this.submitted = true;
    if (!this.sendMail.valid) { return; }
    this.registerServices.Sendmail(data)
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
