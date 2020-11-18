import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../product-item.component';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit{
  constructor(
    public dialogRef:
    MatDialogRef<PurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, price: string, shippable: boolean, type: string}) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  purchaseForm = new FormGroup({
    deliveryAddress: new FormControl(''),
    amountOfHours: new FormControl('')
  });

  ngOnInit() {
  }

  get deliveryAddress() {
    return this.purchaseForm.get('deliveryAddress')
  }
  get amountOfHours() {
    return this.purchaseForm.get('amountOfHours')
  }
}
