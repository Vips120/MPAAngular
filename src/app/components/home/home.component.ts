import { Component, OnInit } from '@angular/core';
import { RegisterServices } from 'src/app/shared/services/register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userRegisterServices: RegisterServices) { }

  ngOnInit() {
    this.userRegisterServices.LoggedInUser().subscribe(data => {
      console.log(data);
    })
  }

}
