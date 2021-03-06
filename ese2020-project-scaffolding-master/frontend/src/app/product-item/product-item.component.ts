import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Product} from '../models/product.model';
import { AuthService } from "../auth.service";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService} from 'ngx-toastr';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ResourceLoader } from '@angular/compiler';


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
  icon = new Observable<string>();
  
  panelOpenState: boolean;
  change: boolean;
  deliveryAddress: string;
  amountOfHours: number;

  @Input() product: Product; // = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null);

  constructor(private auth: AuthService,
    private httpClient: HttpClient,
    public purchaseDialog: MatDialog,
    public deleteDialog: MatDialog,
    public toastr: ToastrService,
    public productService: ProductService) {
  }
  endpointURL = environment.endpointURL;

  openPurchaseDialog(): void {
    const purchaseDialogRef = this.purchaseDialog.open(PurchaseDialogComponent, {
      width: '1000 px',
      data: {title: this.product.title, price: this.product.price, shippable: this.product.shippable, type: this.product.type, deliveryAddress: this.deliveryAddress, amountOfHours: this.amountOfHours, purchaseIt: true}
    });

    purchaseDialogRef.afterClosed().subscribe(result => {
      this.deliveryAddress = result.deliveryAddress;
      this.amountOfHours = result.amountOfHours;
      if(result.purchaseIt) {
        this.onBuy();
      }
    })
  }

  openDeleteDialog(): void {
    const deleteDialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: 'auto',
      data: {title: this.product.title, deleteIt: true}
    });
    deleteDialogRef.afterClosed().subscribe(result => {
      if(result.deleteIt) {
        this.onProductDelete();
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

  onProductDelete(): void{
    this.productService.deleteProduct(this.product.productId, ()=>{});
  }

  onApprove(): void{
    this.productService.approveProduct(this.product);
  }

  onBuy():void{
    this.productService.buyProduct(this.product.productId, this.deliveryAddress, this.amountOfHours)
  }
  onAddToWishlist():void{
    this.productService.addToWishlist(this.product);
  }
  onRemoveFromWishlist():void{
    this.productService.removeFromWishlist(this.product);
  }
  changeWishlist(){
    if(this.product.onWishlist){
      this.onRemoveFromWishlist();
    }else{
      this.onAddToWishlist();
    }
  }
  iconPath():string{
    if(this.product.onWishlist){
      return 'assets/icons/heart-fill.svg';
    } else{
      return 'assets/icons/heart.svg';
    }
  }

}
