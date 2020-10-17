import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userName: string;
  loggedIn: boolean;
  admin: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin(): boolean{
    return this.auth.getAdmin();
  }

  isLoggedIn(): boolean{
    return this.loggedIn = this.auth.isLoggedIn();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }
}
