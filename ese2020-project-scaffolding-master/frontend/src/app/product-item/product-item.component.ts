import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product} from '../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input()
  product: Product = new Product(null, null, ' ', null, ' ', ' ', null, null, null, null, null, null);

}

