import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userName = new Observable<string>();
  loggedIn= new Observable<boolean>();
  isAdmin=  new Observable<boolean>();

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.checkUserStatus();
    this.userName = this.auth.userName;
    this.loggedIn = this.auth.loggedIn;
    this.isAdmin = this.auth.isAdmin;
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['']);
  }
  getUserName(){
    return this.auth.getUserName();
  }

}
