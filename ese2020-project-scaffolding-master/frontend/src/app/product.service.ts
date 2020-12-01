import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Product, Sale, ProductType, Category, Wish} from './models/product.model';
import { environment } from '../environments/environment';
import { ToastrService} from 'ngx-toastr'
import { map} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( 
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router ) { }

  private dataStore: { unapprovedProducts: Product[], products:Product[]} = { unapprovedProducts: [], products: []}
    
  private _unApprovedProducts = new BehaviorSubject<Product[]>([]);
  readonly unapprovedProducts = this._unApprovedProducts.asObservable();

  private _products = new BehaviorSubject<Product[]>([]);
  readonly products = this._products.asObservable();

  // fetch all unapproved products from server
  load(){
    this.loadUnApprovedProducts();
    this.loadProducts();
    this.loadWishlist();
  }
  
  loadUnApprovedProducts(){
    this.httpClient.get<Product[]>(environment.endpointURL+ 'product/unapprovedProducts').subscribe(
      (data: Product[]) => {
        this.dataStore.unapprovedProducts = data;
        this._unApprovedProducts.next(Object.assign({}, this.dataStore).unapprovedProducts);
        console.log('works')
      },
      error => console.log('Could not load unapproved Products')
      
    );
  }

  // approve a product on the server and on the frontend
  approveProduct(product: Product){
    this.httpClient.put(environment.endpointURL + 'product/' + product.productId, {"approved": true}).subscribe(
      response => {
        this.dataStore.unapprovedProducts.forEach((t, i) => {
          if (t.productId === product.productId) {
            this.dataStore.unapprovedProducts.splice(i,1);
          }
        });

        this._unApprovedProducts.next(Object.assign({}, this.dataStore).unapprovedProducts)
        this.toastr.success('Product approved')
      },
      error => {
        this.toastr.error('Product not Approved')
      });
  }
  
  

  
  // fetch all products from server
  loadProducts(){
    this.httpClient.get<Product[]>(environment.endpointURL+ 'product/productList').subscribe(
      (data: Product[]) => {
        this.dataStore.products = data;
        this._products.next(Object.assign({}, this.dataStore).products);
        console.log('works')
      },
      error => console.log('Could not load Products')
      
    );
  }
  getProducts(): Observable<Product[]>{
    return this.products;
  }
  // Returns all current offers of the specified User. Doesen't require admin rights
  getProductsByUser(userId: string): Observable<Product[]>{
    return this.products.pipe(map(products => products.filter(product => product.userId.toString() == userId)))
  }

  getProductsByCategory(category: string): Observable<Product[]>{
    return this.products.pipe(map(products => products.filter(product => product.category.toString() == category)))
  }

  getProductsByType(type: string): Observable<Product[]>{
    return this.products.pipe(map(products => products.filter(product => product.type.toString() == type)))
  }
  // Adds a completly new Product. It belongs automaticly to the currently logged in user
  // tslint:disable-next-line:typedef
  createProduct(product: FormData){
    this.httpClient.post<Product>(environment.endpointURL + 'product/newProduct', product).subscribe(
      response => {
        this.dataStore.products.push(response)
        this._products.next(Object.assign({}, this.dataStore).products)
        this.toastr.success('Product Created')
        this.router.navigate(['']);
      },
      error => {
        this.toastr.error('Product not Created')
      }
  );
  }
  deleteProduct(productId){
    this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe(
      response => {
        this.dataStore.products.forEach((t, i) => {
          if (t.productId === productId) {
            this.dataStore.products.splice(i,1);
          }
        });

        this._products.next(Object.assign({}, this.dataStore).products)
        this.toastr.success('Product deleted')
      },
      error => {
        this.toastr.error('Could not delete Product')
      });
  }


  // load Wishlist
  loadWishlist(){
    this.httpClient.get(environment.endpointURL + 'wishlist').subscribe(
      (data: Wish[]) => {
        data.forEach((wish) => {
          this.dataStore.products.forEach((p,i) =>{
            if(p.productId == wish.productId){
              this.dataStore.products[i].onWishlist = true;
            } else {
              this.dataStore.products[i].onWishlist == false;
            }
          });
          this._products.next(Object.assign({}, this.dataStore).products)
        })
      },
      error => console.log('Could not load wishlist')
      
    );
  }
  addToWishlist(product: Product){
    this.httpClient.post<Product>(environment.endpointURL + 'wishlist/add/' + product.productId, {}).subscribe(
      data => {
        this.dataStore.products.forEach((p,i)=>{
          if(p.productId == product.productId){
            this.dataStore.products[i].onWishlist = true;
          } 
        });
        this._products.next(Object.assign({}, this.dataStore).products)
      },
      error => console.log('Could not add item to wishlist')
    )
  }
  removeFromWishlist(product: Product){
    this.httpClient.delete(environment.endpointURL + 'wishlist/remove/' + product.productId).subscribe(
      response => {
        this.dataStore.products.forEach((p,i) => {
          if (p.productId == product.productId) {
            this.dataStore.products[i].onWishlist = false;
          }
        });

        this._products.next(Object.assign({}, this.dataStore).products)
      },
      error => console.log('Could not remove item from wishlist')
    );
  }
  clearLocalWishlist(){
    this.dataStore.products.forEach((p,i)=>{
      this.dataStore.products[i].onWishlist = false;
    })
  }

  getWishlist():Observable<Product[]>{
    return this.products.pipe(map(products => products.filter(product => product.onWishlist == true)))
  }

  // Make changes to an existing Product. Make sure to use the original productId as it can't be changed
  // tslint:disable-next-line:typedef
  updateProduct(product: Product, productId: number){
    this.httpClient.put(environment.endpointURL + 'product/' + productId, {
      product
    });
  }

  getSoldSales(): Observable<Sale[]>{
    return this.httpClient.get<Sale[]>(environment.endpointURL + 'sale/sold');
  }

  getBoughtSales(): Observable<Sale[]>{
    return this.httpClient.get<Sale[]>(environment.endpointURL + 'sale/bought');

  }
  ngOnInit(): void {
    this.loadProducts();
  }
}
