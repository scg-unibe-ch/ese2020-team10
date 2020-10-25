import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  firstNamej = "";

  registrationForm = new FormGroup({
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
    return this.registrationForm.get('firstName')
  }
  get lastName() {
    return this.registrationForm.get('lastName')
  }
  get userName() {
    return this.registrationForm.get('userName')
  }
  get email() {
    return this.registrationForm.get('email')
  }

  get password() {
    return this.registrationForm.get('password')
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get address(){
    return this.registrationForm.get('address');
  }

  get city(){
    return this.registrationForm.get('city');
  }
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.registrationForm.valid){
      this.httpClient.post(environment.endpointURL + 'user/register', {
          "firstName": this.firstName.value,
          "lastName": this.lastName.value,
          "userName": this.userName.value,
          "email": this.email.value,
          "password": this.password.value,
          "phone": this.phone.value,
          "address": this.address.value,
          "city": this.city.value
        }).subscribe((res: any) => {
          this.router.navigate(['/login']);
      });
   }
}
}
