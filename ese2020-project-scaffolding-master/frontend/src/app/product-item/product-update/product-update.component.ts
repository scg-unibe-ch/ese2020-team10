import {Component, Input, OnInit} from '@angular/core';
import {categoryTypes, Product} from "../../models/product.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {AuthService} from "../../auth.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  @Input()
  product: Product = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null);

  userId: string;
  @Input()
  productTitle: string;
  @Input()
  productDescription: string;
  @Input()
  productPrice: string;

  createOfferForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
  });

  constructor(private httpClient: HttpClient, private router: Router, private currencyPipe: CurrencyPipe, public auth: AuthService) { }

  ngOnInit(): void {
    this.title.setValue(this.productTitle);
    this.description.setValue(this.productDescription);
    this.price.setValue(this.productPrice);
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

  onSubmit(): void {
    //update
  }
}
