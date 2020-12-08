import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ProductService} from "../../product.service";
import {Review} from "../../models/product.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<Review[]>;
  productId: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.productService.load();
  this.route.params.subscribe(params => {
    this.productId = params['productId'];
  });
  this.reviews = this.productService.getReviewsByProduct(this.productId);
  }

}
