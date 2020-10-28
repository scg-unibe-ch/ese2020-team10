import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product} from '../models/product.model';
import {AuthService} from "../auth.service";
import {TodoItem} from "../models/todo-item.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  userId: string;
  admin: boolean;

  @Input()
  product: Product = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null);

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  ngOnInit(): void{
    this.userId = this.auth.getUserId();
    this.admin = this.auth.getAdmin();
  }

  onProductDelete(productId: number): void{
    this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe();
  }
}

