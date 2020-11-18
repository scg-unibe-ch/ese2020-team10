import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Product, Sale, Type} from "../models/product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string;
  private sub: any;
  userId: string;
  buyer: Observable<User[]>;
  userInfo: Observable<User[]>;
  products: Observable<Product[]>;
  soldOffers: Observable<Sale[]>;
  boughtOffers: Observable<Sale[]>;

  constructor(private activatedRoute: ActivatedRoute, public auth: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.userName = params['userName'];
    });
    this.userId = localStorage.getItem('userId');
    this.userInfo = this.auth.getInfoByUser(this.userId);
    this.products = this.productService.getProductsByUser(this.userId);
    this.soldOffers = this.productService.getSoldSales();
    this.boughtOffers = this.productService.getBoughtSales();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }

  onDelete(): void{

  }

  onChange(): void{

  }

}
