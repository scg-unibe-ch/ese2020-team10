import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {combineLatest, Observable} from "rxjs";
import {Product} from "../models/product.model";
import {Form, FormControl} from "@angular/forms";
import {map} from "rxjs/operators";
import {ProductService} from "../product.service";

@Component({
    selector: 'search',
    templateUrl: './search-UI.component.html',
    styleUrls: ['./search-UI.component.css']
  })

  export class SearchUIComponent {

  availability : boolean;
  filterText: String;
  filterLocation: String;
  maxPrice: Number;
  minPrice: Number;
  products: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void{
    this.products = this.productService.getProducts();
  }

  }
