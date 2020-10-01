import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  firstName = '';
  lastName = '';
  userName = '';
  email = '';
  password = '';

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    
  }
}
