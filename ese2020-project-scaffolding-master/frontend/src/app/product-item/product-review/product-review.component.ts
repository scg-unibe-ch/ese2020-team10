import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {Observable} from "rxjs";
import {Product, Review, Sale} from "../../models/product.model";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../product.service";
import {ToastrService} from "ngx-toastr";
import {take} from "rxjs/operators";
@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  @Input() productId: number;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  product: Observable<Product[]>;
  endpointURL = environment.endpointURL;
  formGroup: FormGroup;
  loggedIn: Observable<boolean>;
  currentRate = 0;
  alreadyReviewed: Review;

  constructor(private auth: AuthService,
              private httpClient: HttpClient,
              private productService: ProductService,
              private _ngZone: NgZone,
              private formBuilder: FormBuilder,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.load();
    this.product = this.productService.getProductsByProductId(this.productId.toString());
    this.loggedIn = this.auth.loggedIn;
    this.formGroup = this.formBuilder.group({
      reviewText: ['', Validators.required],
    });
    this.productService.getReviewsByProductAndUser(this.productId).subscribe(review => this.alreadyReviewed = review as Review);
  }

  get reviewText() {
    return this.formGroup.get('reviewText');
  }

  triggerResize() { //resizes textarea
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(){
    if(this.formGroup.valid) {
      this.httpClient.post(environment.endpointURL + 'review/', {
        productId: this.productId,
        rating: this.currentRate,
        reviewText: this.reviewText.value,
      }).subscribe((res: any) => {
          this.toastr.success('Review sent')
        },
        (error: any) => {
          this.toastr.error('Review could not be sent')
        });
    }
  }
}
