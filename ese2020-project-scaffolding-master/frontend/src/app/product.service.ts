import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Product, Sale, Type} from './models/product.model';
import { environment } from '../environments/environment';
import { ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( 
    private httpClient: HttpClient,
    private toastr: ToastrService) { }

  private dataStore: { unapprovedProducts: Product[]} = { unapprovedProducts: []}
  private _unApprovedProducts = new BehaviorSubject<Product[]>([]);
  readonly unapprovedProducts = this._unApprovedProducts.asObservable();
  
  // fetch all unapproved products from server
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
        console.log('Could not remove item from basket')
        this.toastr.error('Product not Approved')
      });
  }
  
  
  
  
  products: Observable<Product[]>;

  ngOnInit(): void {
    this.getProducts();
  }
  // Returns all current offers
  getProducts(): Observable<Product[]> {
    return this.products = this.httpClient.get<Product[]>(environment.endpointURL + 'product/productList');
  }

  getProductsByCategory(category: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByCategory/' + category);
  }
  // Returns all current offers of the specified type (sell, lend or hire)
  getProductsByType(type: Type): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByType/' + type);
  }
  // Returns all current offers of the specified User. Doesen't require admin rights
  getProductsByUser(userId: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/productByUser/' + userId);
  }
  // Adds a completly new Product. It belongs automaticly to the currently logged in user
  // tslint:disable-next-line:typedef
  addProducts(product: Product) {
    this.httpClient.post(environment.endpointURL + 'product/add', {
      product
    });
  }
  // Make changes to an existin Product. Make sure to use the original productId as it can't be changed
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
}
