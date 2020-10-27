import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import { ProductService} from '../product.service';
import { Product, Type} from '../models/product.model'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: string;
  isAdmin: string;
  public sellProducts: Observable<Product[]>;
  public lendProducts: Observable<Product[]>;
  public hireProducts: Observable<Product[]>;


  constructor(public auth: AuthService, public productService : ProductService) { }

  ngOnInit(): void {
    this.user = this.auth.getUserName();
    this.sellProducts = this.productService.getProductsByType('Sell'); // Gets all the current 'sell' products from the backend via productService
    this.lendProducts = this.productService.getProductsByType('Lend');
    this.hireProducts = this.productService.getProductsByType('Hire');
  }

}
