import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {categoryTypes, Product} from "../../models/product.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  @Input()
  product: Product = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null,' ',null);

  userId: string;
  @Input()
  productTitle: string;
  @Input()
  productDescription: string;
  @Input()
  productPrice: string;
  @Input()
  productStatus: boolean;

  @Output()
  update = new EventEmitter<Product>();

  createOfferForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
  });

  constructor(private httpClient: HttpClient, private router: Router, private productService: ProductService) { }

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

  setValue(e): void{
    if (e.checked){
      this.productStatus = true;
    } else {
      this.productStatus = false;
    }
  }

  
  onSubmit(): void{
    this.productService.updateProduct(
      this.product.productId,
      this.title.value,
      this.description.value,
      this.price.value,
      this.productStatus)
  }
}
