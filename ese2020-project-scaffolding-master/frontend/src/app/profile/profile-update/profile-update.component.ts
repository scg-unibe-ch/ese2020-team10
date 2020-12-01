import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  @Input()
  user: User;

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
    this.firstFormGroup.controls['firstName'].setValue(this.user.firstName);
    this.firstFormGroup.controls['lastName'].setValue(this.user.lastName);
    this.secondFormGroup.controls['userName'].setValue(this.user.userName);
    this.secondFormGroup.controls['email'].setValue(this.user.email);
    this.secondFormGroup.controls['password'].setValue(this.user.password);
    this.thirdFormGroup.controls['phone'].setValue(this.user.phone);
    this.thirdFormGroup.controls['address'].setValue(this.user.address);
    this.thirdFormGroup.controls['city'].setValue(this.user.city);
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

  onChange() {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      this.httpClient.put(environment.endpointURL + 'user/' + this.user.userId, {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        phone: this.phone.value,
        address: this.address.value,
        city: this.city.value,
      }).subscribe((res: any) => {
        window.location.reload();
      });
    }
  }

}
