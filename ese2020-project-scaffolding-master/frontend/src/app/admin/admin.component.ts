import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.loadUnApprovedProducts();
    this.products = this.productService.unapprovedProducts;
  }

}
