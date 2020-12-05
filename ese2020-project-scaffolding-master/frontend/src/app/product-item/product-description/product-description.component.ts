import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../product.service";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {environment} from "../../../environments/environment";
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  productId: string;
  product: Observable<Product[]>;
  endpointURL = environment.endpointURL;
  formGroup: FormGroup;
  loggedIn= new Observable<boolean>();

  constructor(private auth: AuthService, private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService, private _ngZone: NgZone, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productService.load();
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
    this.product = this.productService.getProductsByProductId(this.productId.toString());
    this.loggedIn = this.auth.loggedIn;
    this.formGroup = this.formBuilder.group({
      reviewText: ['', Validators.required]
    });
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
        rating: 4,
        reviewText: this.reviewText.value,
        userName: 'hello'

      }).subscribe((res: any) => {});
    }
  }

}
