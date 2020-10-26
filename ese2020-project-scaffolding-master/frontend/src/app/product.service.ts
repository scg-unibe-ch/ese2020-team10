//import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product, Type } from './models/product.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClient: HttpClient) { }

  products : Observable<Product[]>;

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.products = this.httpClient.get<Product[]>(environment.endpointURL+'product/productList');
  }

  getProductsByCategory(category: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByCategory/' + category);
  }

  getProductsByType(type: Type): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByType/' + type);
  }
  
  addProducts(product : Product) {
    this.httpClient.post(environment.endpointURL + 'product/add', {
      product
    });
  }
}
