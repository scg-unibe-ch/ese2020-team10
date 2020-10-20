//import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClien: HttpClient) { }

  products : Observable<Product[]>;

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.products = this.httpClien.get<Product[]>(environment.endpointURL+'product/productList');
  }
  
}
