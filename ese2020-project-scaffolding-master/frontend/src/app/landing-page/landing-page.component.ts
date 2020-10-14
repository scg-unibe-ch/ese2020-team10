import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: string;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userName');
    this.user = this.user[0].toUpperCase() + this.user.substr(1).toLowerCase();
  }

}
