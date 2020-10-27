import {Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit{

  productId = null;
  category = '';
  title = '';
  price = null;
  description = '';
  location = '';
  type = '';
  sellOrLend = false;
  status = false;
  shippable = false;
  userId = null;
  approved = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkProductView();
  }

  checkProductView(): void {
    // Get product data from local storage
    this.productId = localStorage.getItem('productId');
    this.category = localStorage.getItem('category');
    this.title = localStorage.getItem('title');
    this.price = localStorage.getItem('price');
    this.description = localStorage.getItem('description');
    this.location = localStorage.getItem('location');
    this.type = localStorage.getItem('type');
    this.sellOrLend = (localStorage.getItem('sellOrLend') == "true");
    this.status = (localStorage.getItem('status') == "true");
    this.shippable = (localStorage.getItem('shippable') == "true");
    this.userId = localStorage.getItem('userId');
    this.approved = (localStorage.getItem('approved') == "true");

  }
}
