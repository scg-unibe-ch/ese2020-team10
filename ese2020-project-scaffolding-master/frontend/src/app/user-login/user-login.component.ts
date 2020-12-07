import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  hidePassword = true;
  loggedIn = new Observable<boolean>();
  isAdmin = new Observable<boolean>();


  constructor(
    private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.checkUserStatus();
    this.loggedIn = this.auth.loggedIn;
    this.isAdmin = this.auth.isAdmin;
  }


  onLogout(){
    this.auth.logout();
  }
  onLogin(){
    this.auth.login(this.userName, this.password);
  }
}
