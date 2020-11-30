import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }
  
  public products: Observable<Product[]>

  ngOnInit(): void {
    this.productService.load();
    this.products = this.productService.products;
  }

}
