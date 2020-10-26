import { ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core'

export class Product { 
    constructor(
        productId: number,
        category: Category,
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

export enum Category {
    PartyCatering = 'PartyCatering',
    Clothing = 'Clothing',
    Games = 'Games',
    Books = 'Books',
    Electronics = 'Electronics',
    MovingTransport = 'MovingTransport',
    ClassesTutoring = 'ClassesTutoring',
    HouseholdCleaning = 'HouseholdCleaning'
}

export namespace Category {

    export function values() {
      return Object.keys(Category).filter(
        (category) => isNaN(<any>category) && category !== 'values'
      );
    }
  }

  export type Type = 'Sell' | 'Lend' | 'Hire'