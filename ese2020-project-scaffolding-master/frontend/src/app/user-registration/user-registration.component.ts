import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router,private formBuilder: FormBuilder) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  hidePassword = true;

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      password: ['', Validators.compose([Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$')])]
    });
    this.thirdFormGroup = this.formBuilder.group({
      phone: ['',  Validators.pattern('^(0|0041|\\+41)?[1-9\\s][0-9\\s]{1,12}$')],
      address: ['', null],
      city: ['', null]
    });
  }

  get firstName() {
    return this.firstFormGroup.get('firstName')
  }
  get lastName() {
    return this.firstFormGroup.get('lastName')
  }
  get userName() {
    return this.secondFormGroup.get('userName')
  }
  get email() {
    return this.secondFormGroup.get('email')
  }

  get password() {
    return this.secondFormGroup.get('password')
  }

  get phone(){
    return this.thirdFormGroup.get('phone');
  }

  get address(){
    return this.thirdFormGroup.get('address');
  }

  get city() {
    return this.thirdFormGroup.get('city');
  }

  onSubmit() {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      this.httpClient.post(environment.endpointURL + 'user/register', {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        phone: this.phone.value,
        address: this.address.value,
        city: this.city.value,
        wallet: 100
      }).subscribe((res: any) => {
        this.router.navigate(['/login']);
      });
    }
  }

}
