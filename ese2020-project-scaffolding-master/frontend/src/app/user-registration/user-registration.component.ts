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
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$')]),
    phone: new FormControl('',[
      Validators.pattern('^(0|0041|\\+41)?[1-9\\s][0-9\\s]{1,12}$')]),
    address: new FormControl('', null),
    city: new FormControl('', null),
  });

  optional = false;

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

  get phone(){
    return this.userEmailPassword.get('phone');
  }

  get address(){
    return this.userEmailPassword.get('address');
  }

  get city(){
    return this.userEmailPassword.get('address');
  }
  constructor() { }

  ngOnInit(): void {
  }

  register(): void {

  }
}
