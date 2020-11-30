import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Product} from '../models/product.model';
import {AuthService} from "../auth.service";
import {TodoItem} from "../models/todo-item.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService} from 'ngx-toastr';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';



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
  userId = new Observable<number>();
  userName = new Observable<string>();
  isAdmin = new Observable<boolean>();
  loggedIn = new Observable<boolean>();
  
  panelOpenState: boolean;
  change: boolean;
  deliveryAddress: string;
  amountOfHours: number;

  @Input() product: Product; // = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null);

  constructor(private auth: AuthService,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public productService: ProductService) {
  }
  endpointURL = environment.endpointURL;

  openPurchaseDialog(): void {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      width: '1000 px',
      data: {title: this.product.title, price: this.product.price, shippable: this.product.shippable, type: this.product.type, deliveryAddress: this.deliveryAddress, amountOfHours: this.amountOfHours, purchaseIt: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deliveryAddress = result.deliveryAddress;
      this.amountOfHours = result.amountOfHours;
      if(result.purchaseIt) {
        this.onBuy();
      }
    })
  }

  ngOnInit(): void{
    this.auth.checkUserStatus();
    this.userId = this.auth.userId;
    this.userName = this.auth.userName;
    this.isAdmin = this.auth.isAdmin;
    this.loggedIn = this.auth.loggedIn;
    this.change = false;
    this.panelOpenState = false;
  }

  onProductDelete(productId: number): void{
    this.httpClient.delete(environment.endpointURL + 'product/' + productId).subscribe((res:any) =>{
      window.location.reload();
    });
  }

  onApprove(): void{
    this.productService.approveProduct(this.product);
  }

  onBuy():void{
    this.httpClient.post(environment.endpointURL + 'sale/buy',{
      "productId": this.product.productId,
      "deliveryAddress": this.deliveryAddress,
      "amountOfHours": this.amountOfHours
    }).subscribe((res:any) =>{
        this.toastr.success('Bought successfully')
      },
      (error: any) => {
        this.toastr.error('Could not be purchased')
      }
    );
  }
}
