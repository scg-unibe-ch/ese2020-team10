import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Category} from '../models/product.model';

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
  @Input() Category = Category;
  selectedCategory;
  shippable;
  type: string;
  
  constructor(private httpClient: HttpClient, private router: Router, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.selectedCategory = Category[0];
    this.shippable = 'false';
    this.type = 'Sell';
  }

  transformAmount(element){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');
    element.target.value = this.formattedAmount;
  }    

  createOfferForm = new FormGroup({
    productOrService: new FormControl(),
    title: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required]),
    price: new FormControl('', [
      Validators.required]),
    pictureLink: new FormControl('', [
      Validators.required]),
    location: new FormControl(),
  });
 

  get productOrService() {
    return this.createOfferForm.get('productOrService');
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
  get pictureLink() {
    return this.createOfferForm.get('pictureLink');
  }
  get location() {
    return this.createOfferForm.get('location');
  }

  onSubmit(): void {
    if(this.createOfferForm.valid){
      this.httpClient.post(environment.endpointURL + 'user/createOffer', {
        "category": this.selectedCategory,
        "title": this.title.value,
        "description": this.description.value,
        "price": this.price.value,
        "location": this.location.value,
        "type": this.type,
        "shippable": this.shippable,
        "pictureLink": this.pictureLink.value,
      }).subscribe((res: any) => {
        this.router.navigate(['']);
    });
   }
  }
}
