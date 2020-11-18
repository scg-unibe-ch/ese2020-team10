import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { categoryTypes, Product} from '../models/product.model';
import { AuthService } from '../auth.service';

interface Select {
  value: string,
  viewValue: string,
}

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  @Input() categories = categoryTypes;
  userId: string;
  product: Product;

  constructor(private httpClient: HttpClient, private router: Router, private currencyPipe: CurrencyPipe, public auth: AuthService) { }

  ngOnInit(): void {
    //sets default value for select
    this.productOrService.setValue('Product');
    this.type.setValue('Sell');
    this.selectedCategory.setValue(this.categories[0]);
    this.shippable.setValue('false');
  }

  createOfferForm = new FormGroup({
    selectedCategory: new FormControl(),
    productOrService: new FormControl(),
    title: new FormControl('', [
      Validators.required]),
    description: new FormControl('', [
      Validators.required]),
    price: new FormControl('', [
      Validators.required, Validators.pattern("(\\d+(\\.\\d{1,2})?)")]),
    location: new FormControl(),
    type: new FormControl(),
    shippable: new FormControl(),
  });

  get selectedCategory() {
    return this.createOfferForm.get('selectedCategory');
  }
  get productOrService() {
    return this.createOfferForm.get('productOrService');
  }
  get title() {
    return this.createOfferForm.get('title');
  }
  get description() {
    return this.createOfferForm.get('description');
  }
  get price() {
    return this.createOfferForm.get('price');
  }
  get location() {
    return this.createOfferForm.get('location');
  }
  get type() {
    return this.createOfferForm.get('type');
  }
  get shippable() {
    return this.createOfferForm.get('shippable');
  }

  onSubmit(): void {
    this.userId =  this.auth.getUserId();
    if(this.createOfferForm.valid){
      this.httpClient.post(environment.endpointURL + 'product/add', {
        category: this.selectedCategory.value,
        title: this.title.value,
        description: this.description.value,
        price: this.price.value,
        location: this.location.value,
        type: this.type.value,
        shippable: this.shippable.value,
        status: true,
        userId: this.userId
      })
      .subscribe((res: any) => {
        this.router.navigate(['']);
    });
   }
  }

  isService(): boolean {
    if(this.productOrService.value === 'Service') {
      this.type.setValue('Hire');
      this.shippable.setValue('false');
    }
    return this.productOrService.value === 'Service';
  }

  isProduct(): boolean {
    if(this.productOrService.value === 'Product') {
      this.location.setValue('');
    }
    return this.productOrService.value === 'Product';
  }

  priceFormat(): string {
    if(this.type.value === 'Sell') {
      return 'Price';
    } else {
      return 'Price per Hour';
    }
  }

}
