import { Component, OnInit } from '@angular/core';
import { RegisterServices } from 'src/app/shared/services/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentuser;
  constructor(private registerServices: RegisterServices, private router: Router) { }

  ngOnInit() {
    this.registerServices.userLog.subscribe(x => {
      console.log(x);
      this.currentuser = x;
    })
  };

  Logout() {
    this.registerServices.LogOut();
    this.router.navigateByUrl("/login");
  }

}
