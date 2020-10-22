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
    productOrService: new FormControl('', [
      Validators.required]),
    title: new FormControl('', [
      Validators.required]),
    price: new FormControl('', [
      Validators.required]),
    pictureLink: new FormControl('', [
      Validators.required]),
  });


  get productOrService() {
    return this.createOfferForm.get('productOrService');
  }
  get title() {
    return this.createOfferForm.get('title');
  }
  get price() {
    return this.createOfferForm.get('price');
  }

  get pictureLink() {
    return this.createOfferForm.get('pictureLink');
  }


  onSubmit(): void {
    if(this.createOfferForm.valid){
      this.httpClient.post(environment.endpointURL + 'user/createOffer', {
          "productOrService": this.productOrService.value,
          "title": this.title.value,
          "price": this.price.value,
        }).subscribe((res: any) => {
          this.router.navigate(['']);
      });
   }
  }
  onFileChanged(event) {
    const file = event.target.files[0]
  }
}
