import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Pipe({
  name: 'productfilter'
})
export class ProductfilterPipe implements PipeTransform {

  transform(Products: Product[], searchText: String, location: String, maxPrice:number): Product[] {
    console.log(Product[0].price)
    console.log(Products[0].price <= maxPrice)
    if(!Products)
      return Products;
    
    if(!searchText)
      searchText = ""
    
    if(!location)
      location = ""
    //console.log(maxPrice)
    //console.log(100 <= maxPrice)
    /**if(!minPrice)
      minPrice = 0
    
    if(!maxPrice)
      maxPrice = Number.MAX_SAFE_INTEGER
*/
    return Products.filter(product =>
      product.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) && product.price <= maxPrice && product.location.toLocaleLowerCase().includes(location.toLocaleLowerCase())
      //&& product.price >= minPrice && product.price <= maxPrice
      );
  }
  /**
   * transform(Products: Product[], searchText: String, minPrice: Number, maxPrice: Number, location: String, availability: boolean): Product[] {
    if(!Products)
      return Products;
    
    return Products.filter(product =>
      product.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) && product.price >= minPrice && product.price <= maxPrice && 
      product.location.toLocaleLowerCase().includes(location.toLocaleLowerCase()) && (availability || product.shippable));
  }
   */

}

