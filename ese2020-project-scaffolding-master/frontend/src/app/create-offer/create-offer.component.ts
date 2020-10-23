import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Select {
  value: string,
  viewValue: string,
}

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  formattedAmount;
  amount;
  categories: Select[] = [
    {value: 'PartyCatering', viewValue: 'PartyCatering'},
    {value: 'Clothing', viewValue: 'Clothing'},
    {value: 'Games', viewValue: 'Games'},
    {value: 'Books', viewValue: 'Books'},
    {value: 'Electronics', viewValue: 'Electronics'},
    {value: 'MovingTransport', viewValue: 'MovingTransport'},
    {value: 'ClassesTutoring', viewValue: 'ClassesTutoring'},
    {value: 'HouseholdCleaning', viewValue: 'HouseholdCleaning'},
  ]

  types: Select[] = [
    {value: 'Product', viewValue: 'Product'},
    {value: 'Service', viewValue: 'Service'},
  ]

  categoryControl = new FormControl(this.categories[0].value);
  typeControl = new FormControl(this.types[0].value);
  
  constructor(private httpClient: HttpClient, private router: Router, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
  }

  transformAmount(element){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');

    element.target.value = this.formattedAmount;
  }    

  createOfferForm = new FormGroup({
    category: this.categoryControl,
    title: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required]),
    price: new FormControl('', [
      Validators.required]),
    type: this.typeControl,
    sellOrLend: new FormControl(),
    shippable: new FormControl(),
    pictureLink: new FormControl('', [
      Validators.required]),
    location: new FormControl(),
  });
 
  get category() {
    return this.createOfferForm.get('category');
  }
  get title() {
    return this.createOfferForm.get('title');
  }
  get description() {
    return this.createOfferForm.get('description');
  }
  get price() {
    return this.createOfferForm.get('price');
  }
  get type() {
    return this.createOfferForm.get('type');
  }
  get sellOrLend() {
    return this.createOfferForm.get('sellOrLend');
  }
  get shippable() {
    return this.createOfferForm.get('shippable');
  }
  get pictureLink() {
    return this.createOfferForm.get('pictureLink');
  }
  get location() {
    return this.createOfferForm.get('location');
  }

  onSubmit(): void {
    if(this.createOfferForm.valid){
      this.httpClient.post(environment.endpointURL + 'user/createOffer', {
        "category": this.category.value,
        "title": this.title.value,
        "description": this.description.value,
        "price": this.price.value,
        "location": this.location.value,
        "type": this.type.value,
        "sellOrLend": this.sellOrLend.value,
        "shippable": this.shippable.value,
        "pictureLink": this.pictureLink.value,
      }).subscribe((res: any) => {
        this.router.navigate(['']);
    });
   }
  }
}
