import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {ProductService} from "../../product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-type-catalog',
  templateUrl: './type-catalog.component.html',
  styleUrls: ['./type-catalog.component.css']
})
export class TypeCatalogComponent implements OnInit {

  public products: Observable<Product[]>;
  public type: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.load();
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
    this.products = this.productService.getProductsByType(this.type);
  }

}
