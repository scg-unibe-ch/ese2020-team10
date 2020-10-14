import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: string;
  isAdmin: string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUserName();
    this.user = this.user[0].toUpperCase() + this.user.substr(1).toLowerCase();
  }

}
