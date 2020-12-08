import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import { ProductService} from '../product.service';
import { Product} from '../models/product.model'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: string;
  isAdmin: string;
  public products: Observable<Product[]>;
  public sellProd: Product[];
  public lendProd: Product[];
  public hireProd: Product[];

  constructor(public auth: AuthService, public productService: ProductService) { }

  ngOnInit(): void {
    this.auth.checkUserStatus();
    this.productService.load();
    this.productService.getProductsByType('Sell').subscribe(products => this.sellProd = products as Product[]);
    this.productService.getProductsByType('Lend').subscribe(products => this.lendProd = products as Product[]);
    this.productService.getProductsByType('Hire').subscribe(products => this.hireProd = products as Product[]);
    this.user = this.auth.getUserName();
    this.products = this.productService.products;
  }

  search(): void{

  }

}
