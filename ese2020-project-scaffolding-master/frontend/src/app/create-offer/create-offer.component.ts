import { Component, Input, OnInit, NgZone, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { categoryTypes, Product} from '../models/product.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient, private router: Router, private formBuilder: FormBuilder, private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() categories = categoryTypes;
  userId: string;
  product: Product;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      productOrService: ['Product', null]
    });
    this.secondFormGroup = this.formBuilder.group({
      selectedCategory: [this.categories[0], null],
      type: ['Sell', null],
      shippable: ['false', null]
    });
    this.thirdFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['0.00', Validators.compose([Validators.required, Validators.pattern("(\\d+(\\.\\d{1,2})?)")])],
      location: ['', null],
      file: ['', null],
      fileSource: ['', null]
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.thirdFormGroup.patchValue({
        fileSource: file
      });
    }
  }

  get productOrService() {
    return this.firstFormGroup.get('productOrService');
  }
  get selectedCategory() {
    return this.secondFormGroup.get('selectedCategory');
  }
  get type() {
    return this.secondFormGroup.get('type');
  }
  get shippable() {
    return this.secondFormGroup.get('shippable');
  }
  get title() {
    return this.thirdFormGroup.get('title');
  }
  get description() {
    return this.thirdFormGroup.get('description');
  }
  get price() {
    return this.thirdFormGroup.get('price');
  }
  get location() {
    return this.thirdFormGroup.get('location');
  }

 

  onSubmit(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const formData = new FormData();
      formData.append('productImage', this.thirdFormGroup.get('fileSource').value);
      formData.append('category', this.secondFormGroup.get('selectedCategory').value);
      formData.append('title', this.thirdFormGroup.get('title').value);
      formData.append('price', this.thirdFormGroup.get('price').value);
      formData.append('description', this.thirdFormGroup.get('description').value);
      formData.append('location', this.thirdFormGroup.get('location').value);
      formData.append('type', this.secondFormGroup.get('type').value);
      formData.append('shippable', this.secondFormGroup.get('shippable').value);

      this.httpClient.post(environment.endpointURL + 'product/newProduct', formData).subscribe((res: any) => {
          this.router.navigate(['']);
      });
    }
  }

  isService(): boolean {
    if(this.productOrService.value === 'Service') {
      this.type.setValue('Hire');
    }
    return this.productOrService.value === 'Service';
  }

  isProduct(): boolean {
    return this.productOrService.value === 'Product';
  }

  isShippable(): boolean {
    return this.shippable.value === 'true';  
  }

  priceFormat(): string {
    if(this.type.value === 'Sell') {
      return 'Price';
    } else {
      return 'Price per Hour';
    }
  }

  triggerResize() { //resizes textarea
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
