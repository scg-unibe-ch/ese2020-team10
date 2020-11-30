import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../product.service";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrls: ['./category-catalog.component.css']
})
export class CategoryCatalogComponent implements OnInit {

  category: string;
  products: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    });
    this.products = this.productService.getProductsByCategory(this.category);
  }

}
