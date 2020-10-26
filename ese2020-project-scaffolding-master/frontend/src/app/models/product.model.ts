import { ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core'

export class Product { 
    constructor(
        productId: number,
        category: string,
        title: string,
        price: number,
        description: string,
        location: string,
        type: string,
        status: boolean,
        shippable: boolean,
        userId: string,
        approved: boolean
    ) {}
}

export let categoryTypes: string[] = [
  "PartyCatering",
  "Clothing",
  "Games",
  "Books",
  "Electronics",
  "MovingTransport",
  "ClassesTutoring",
  "HouseholdCleaning",
]

  export type Type = 'Sell' | 'Lend' | 'Hire'