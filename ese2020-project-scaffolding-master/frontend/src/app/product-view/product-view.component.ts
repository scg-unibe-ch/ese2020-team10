import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {

  productId = null;
  title = 'asnee';
  price = null;
  description = '';
  location = '';
  sellOrLend = false;
  status = false;
  deliverable = false;

  constructor(private httpClient: HttpClient) { }


}
