import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../product.service";
import { Observable } from "rxjs";
import {Product, Review, Sale} from "../../models/product.model";
import { environment } from "../../../environments/environment";
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  productId: string;
  product: Observable<Product[]>;
  reviews: Observable<Review[]>;
  reviewAllowed: Sale;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.load();
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
    this.product = this.productService.getProductsByProductId(this.productId.toString());
    this.reviews = this.productService.getReviewsByProduct(this.productId);
    this.productService.getSalesForReview(this.productId).subscribe(sales => {this.reviewAllowed = sales as Sale});
  }

}
