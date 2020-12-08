import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

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
      this.authService.register(
        this.firstName.value,
        this.lastName.value,
        this.userName.value,
        this.email.value,
        this.password.value,
        this.phone.value,
        this.address.value,
        this.city.value,
        () => { this.router.navigate(['/login'])}
      )
    }
  }

}
