//import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product, Category, Type } from './models/product.model';
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

  getProductsByCategory(category:Category): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/' + category);
  }

  getProductsByType(type: Type): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/' + type);
  }
  
  addProducts(product : Product) {
    this.httpClient.post(environment.endpointURL + 'product/add', {
      product
    });
  
}
