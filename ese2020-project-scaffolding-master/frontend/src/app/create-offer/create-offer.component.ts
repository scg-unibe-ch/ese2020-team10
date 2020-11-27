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
    file: new FormControl(''),
    fileSource: new FormControl('')
  });


  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createOfferForm.patchValue({
        fileSource: file
      });
    }
  }


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

  onSubmit(){
    const formData = new FormData();
    formData.append('productImage', this.createOfferForm.get('fileSource').value);
    formData.append('category', this.createOfferForm.get('selectedCategory').value);
    formData.append('title', this.createOfferForm.get('title').value);
    formData.append('price', this.createOfferForm.get('price').value);
    formData.append('description', this.createOfferForm.get('description').value);
    formData.append('location', this.createOfferForm.get('location').value);
    formData.append('type', this.createOfferForm.get('type').value);
    formData.append('shippable', this.createOfferForm.get('shippable').value);

    this.httpClient.post(environment.endpointURL + 'product/newProduct', formData).subscribe((res: any) => {
        this.router.navigate(['']);
    });
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
