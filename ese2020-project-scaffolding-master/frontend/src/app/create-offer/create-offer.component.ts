import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  formattedAmount;
  amount;
  constructor(private httpClient: HttpClient, private router: Router, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
  }

  transformAmount(element){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');

    element.target.value = this.formattedAmount;
  }    

  createOfferForm = new FormGroup({
    category: new FormControl('', [
      Validators.required]),
    title: new FormControl('', [
      Validators.required]),
    price: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required]),
    location: new FormControl(''),
    type: new FormControl(true, [
      Validators.required]),
    sellOrLend: new FormControl(true, [
      Validators.required]),
    shippable: new FormControl(false, [
      Validators.required]),
    pictureLink: new FormControl('', [
      Validators.required]),
  });
 
  get category() {
    return this.createOfferForm.get('category');
  }
  get title() {
    return this.createOfferForm.get('title');
  }
  get price() {
    return this.createOfferForm.get('price');
  }
  get description() {
    return this.createOfferForm.get('description');
  }
  get location() {
    return this.createOfferForm.get('location');
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


  onSubmit(): void {
    if(this.createOfferForm.valid){
      this.httpClient.post(environment.endpointURL + 'user/createOffer', {
        "category": this.category.value,
        "title": this.title.value,
        "price": this.price.value,
        "description": this.description.value,
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
  onFileChanged(event) {
    const file = event.target.files[0]
  }
}
