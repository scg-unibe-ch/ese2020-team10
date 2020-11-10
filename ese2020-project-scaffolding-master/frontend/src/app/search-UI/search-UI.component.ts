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

  
  allProducts: Observable<Product[]>;
  products: Observable<Product[]>;
  filteredProducts: Observable<Product[]>;
  titleFilter: FormControl;
  filters: Observable<string>;


  constructor(private productService: ProductService, private httpClient: HttpClient) {
    //this.titleFilter = new FormControl('');
    //this.allProducts = this.productService.getProducts();
  }

  ngOnInit(): void{
    this.products = this.productService.getProducts();
    
    //this.filters = this.titleFilter.valueChanges;
    //this.filteredProducts = combineLatest(this.products, this.filters).pipe(map(([products, filterString]) =>
      //products.filter(product => product.title.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
  }

 /*   formatLabel(value: number) {
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }

      return value;
    }

    search() {

    }*/
  }
