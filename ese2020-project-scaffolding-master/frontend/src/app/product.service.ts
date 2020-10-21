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
  // Returns all current offers
  getProducts() {
    this.products = this.httpClient.get<Product[]>(environment.endpointURL+'product/productList');
  }
  // Returns all current offers of the specified category
  getProductsByCategory(category:Category): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByCategory/' + category);
  }
  // Returns all current offers of the specified type (sell, lend or hire) 
  getProductsByType(type: Type): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByType/' + type);
  }
  // Returns all current offers of the specified User. Doesen't require admin rights
  getProductsByUser(userId: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByUser/' + userId);
  }
  // Adds a completly new Product. It belongs automaticly to the currently logged in user
  addProducts(product : Product) {
    this.httpClient.post(environment.endpointURL + 'product/add', {
      product
    });
  }
  // Make changes to an existin Product. Make sure to use the original productId as it can't be changed
  updateProduct(product: Product, productId: number){
    this.httpClient.put(environment.endpointURL + 'product/' + productId, {
      product
    });
  }
  // Products that have yet to be approved by an administrator. Function works only for users with admin rights
  getUnapprovedProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL+ 'product/unapprovedProducts');
  }
}
