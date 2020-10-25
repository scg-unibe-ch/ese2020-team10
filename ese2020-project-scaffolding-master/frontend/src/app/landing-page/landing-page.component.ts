import { Component, OnInit } from '@angular/core';
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
  public sellProducts : Observable<Product[]>

  constructor(public auth: AuthService, public productService : ProductService) { }

  ngOnInit(): void {
    this.user = this.auth.getUserName();
   // this.sellProducts = this.productService.getProductsByType('Sell');
  }

}
