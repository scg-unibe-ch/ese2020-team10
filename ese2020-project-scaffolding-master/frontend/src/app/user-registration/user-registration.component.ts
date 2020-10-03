import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userEmailPassword = new FormGroup({
    firstName: new FormControl('', [
      Validators.required]),
    lastName: new FormControl('', [
      Validators.required]),
    userName: new FormControl('', [
      Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$")])
  });

  hidePassword = true;
  get firstName() {
    return this.userEmailPassword.get('firstName')
  }
  get lastName() {
    return this.userEmailPassword.get('lastName')
  }
  get userName() {
    return this.userEmailPassword.get('userName')
  }
  get email() {
    return this.userEmailPassword.get('email')
  }

  get password() {
    return this.userEmailPassword.get('password')
  }
  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    
  }
}
