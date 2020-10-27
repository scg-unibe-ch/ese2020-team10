import {Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit{

  productId = null;
  title = '';
  price = null;
  description = '';
  location = '';
  sellOrLend = false;
  status = false;
  deliverable = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkProductView();
  }

  checkProductView(): void {
    // Get product data from local storage
    this.productId = localStorage.getItem('productId');
    this.title = localStorage.getItem('title');
    this.price = localStorage.getItem('price');
    this.description = localStorage.getItem('description');
    this.location = localStorage.getItem('location');
    this.sellOrLend = (localStorage.getItem('sellOrLend') == "true");
    this.status = (localStorage.getItem('status') == "true");
    this.deliverable = (localStorage.getItem('deliverable') == "true");
    
  }
}
