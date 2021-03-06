import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../../models/product.model";
import {AuthService} from "../../../auth.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../../product.service";
import {environment} from "../../../../environments/environment";
import {PurchaseDialogComponent} from "../../purchase-dialog/purchase-dialog.component";
import {Router} from "@angular/router";
import {Location} from "@angular/common"


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  userId = new Observable<number>();
  userName = new Observable<string>();
  isAdmin = new Observable<boolean>();
  loggedIn = new Observable<boolean>();
  icon = new Observable<string>();

  panelOpenState: boolean;
  change: boolean;
  deliveryAddress: string;
  amountOfHours: number;

  @Input()
  productInfo: Product;

  constructor(private auth: AuthService,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public toastr: ToastrService,
              public productService: ProductService,
              private router: Router,
              private location: Location) {
  }
  endpointURL = environment.endpointURL;

  openPurchaseDialog(): void {
    const dialogRef = this.dialog.open(PurchaseDialogComponent, {
      width: '1000 px',
      data: {title: this.productInfo.title, price: this.productInfo.price, shippable: this.productInfo.shippable, type: this.productInfo.type, deliveryAddress: this.deliveryAddress, amountOfHours: this.amountOfHours, purchaseIt: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deliveryAddress = result.deliveryAddress;
      this.amountOfHours = result.amountOfHours;
      if(result.purchaseIt) {
        this.onBuy();
      }
    });
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

  async onProductDelete(productId: number){
    this.productService.deleteProduct(this.productInfo.productId, () => {
      this.location.back();
    });
  }

  onApprove(): void{
    this.productService.approveProduct(this.productInfo);
  }

  onBuy():void{
    this.productService.buyProduct(this.productInfo.productId, this.deliveryAddress, this.amountOfHours)
  }
  onAddToWishlist():void{
    this.productService.addToWishlist(this.productInfo);
  }
  onRemoveFromWishlist():void{
    this.productService.removeFromWishlist(this.productInfo);
  }
  changeWishlist(){
    if(this.productInfo.onWishlist){
      this.onRemoveFromWishlist();
    }else{
      this.onAddToWishlist();
    }
  }
  iconPath():string{
    if(this.productInfo.onWishlist){
      return 'assets/icons/heart-fill.svg';
    } else{
      return 'assets/icons/heart.svg';
    }
  }


}
