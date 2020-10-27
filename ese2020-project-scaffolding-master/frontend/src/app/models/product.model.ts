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
  'Accessories',
  'AudioTV',
  'Books',
  'Clothing',
  'Electronics',
  'Games',
  'Animals',
  'ClassesTutoring',
  'ComputerMobilePhones',
  'HouseholdCleaning',
  'MovingTransport',
  'PartyCatering'
]

  export type Type = 'Sell' | 'Lend' | 'Hire'
