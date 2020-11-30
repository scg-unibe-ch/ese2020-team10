import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './product.service';




@Pipe({
  name: 'wishlistfilter'
})
export class WishlistPipe implements PipeTransform{
  transform(products: Product[]):Product[]{
    return products.filter(product => product.onWishlist);
  }

  
}



@Pipe({
  name: 'productfilter'
})
export class ProductfilterPipe implements PipeTransform {

  transform(Products: Product[], searchText: String, location: String, maxPrice:number, minPrice:number , availability:boolean, onWishlist: boolean): Product[] {
    if(!Products)
      return Products;
    
    if(!searchText)
      searchText = ""
    
    if(!location)
      location = ""

    if(!minPrice)
      minPrice = 0
    
    if(!maxPrice)
      maxPrice = Number.MAX_SAFE_INTEGER

    return Products.filter(product =>
      product.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
      && product.price <= maxPrice && product.price >= minPrice
      && product.location.toLocaleLowerCase().includes(location.toLocaleLowerCase())
      &&(availability || product.shippable));
  }

}

