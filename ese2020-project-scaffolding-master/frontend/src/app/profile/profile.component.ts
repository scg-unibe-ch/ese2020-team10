import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Product, Sale, ProductType} from "../models/product.model";
import {ProductService} from "../product.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string;
  private sub: any;
  userId: string;
  change: boolean;
  buyer: Observable<User[]>;
  userInfo: Observable<User[]>;
  products: Observable<Product[]>;
  soldOffers: Observable<Sale[]>;
  boughtOffers: Observable<Sale[]>;

  constructor(private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    private productService: ProductService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.auth.checkUserStatus();
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.userName = params['userName'];
    });
    this.userId = localStorage.getItem('userId');
    this.userInfo = this.auth.getUser(this.userId);
    this.products = this.productService.getProductsByUser(this.userId);
    this.soldOffers = this.productService.getSoldSales();
    this.boughtOffers = this.productService.getBoughtSales();
    this.change = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }

  onDelete(productId: number): void{
    this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe(res =>{
      window.location.reload();
    });
  }


  onMakeAvailable(productId: number): void{
    this.httpClient.put(environment.endpointURL + 'product/' +productId, {
      "status": true
    }).subscribe(res => {
      window.location.reload();
    })
  }

}
