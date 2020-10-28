import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Product} from "../models/product.model";
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
  userInfo: Observable<User[]>;
  public products: Observable<Product[]>;

  constructor(private activatedRoute: ActivatedRoute, public auth: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.userName = params['userName'];
    });
    this.userId = localStorage.getItem('userId');
    this.userInfo = this.auth.getInfoByUser(this.userId);
    this.products = this.productService.getProductsByUser(this.userId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }
}
