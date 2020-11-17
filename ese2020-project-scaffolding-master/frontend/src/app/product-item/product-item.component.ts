import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Product} from '../models/product.model';
import {AuthService} from "../auth.service";
import {TodoItem} from "../models/todo-item.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  userId: string;
  userName: string;
  admin: boolean;
  panelOpenState: boolean;
  change: boolean;

  @Input()
  product: Product = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null);

  constructor(private auth: AuthService,
    private httpClient: HttpClient,
    public dialog: MatDialog) {
  }

  openPurchaseDialog(): void {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      width: '1000 px',
      data: {title: this.product.title, price: this.product.price, shippable: this.product.shippable, type: this.product.type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog was closed');
    })
  }

  ngOnInit(): void{
    this.userId = this.auth.getUserId();
    this.userName = this.auth.getUserName();
    this.admin = this.auth.getAdmin();
    this.change = false;
    this.panelOpenState = false;
  }

  onProductDelete(productId: number): void{
    this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe();
  }

  onApprove(productId: number): void{
    this.httpClient.put(environment.endpointURL + 'product/' + productId, {
      approved: true
    }).subscribe();
  }

  onBuy():void{
    this.httpClient.post(environment.endpointURL + 'sale/buy',{
      "productId": this.product.productId,
      "buyerId":this.auth.getUserId,
      "sellerId": this.product.userId,
      "pointOfSalePrice":this.product.price
    }).subscribe();
  }
}
