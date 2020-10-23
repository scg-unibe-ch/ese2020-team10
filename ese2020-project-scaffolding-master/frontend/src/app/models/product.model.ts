import { ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core'

export class Product { 
    constructor(
        productId: number,
        category: Category,
        title: string,
        price: number,
        description: string,
        location: string,
        type: Type,
        sellOrLend: boolean,
        status: boolean,
        shippable: boolean,
        userId: number,
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

export type Type = 'Sell' | 'Lend' | 'Hire'