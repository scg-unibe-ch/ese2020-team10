import { ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core'

export class Product { 
    productId: number;
    category: Category;
    title: string;
    price: number;
    description: string;
    location: string;
    type: Type;
    sellOrLend: boolean;
    status: boolean;
    shippable: boolean;
    userId: number;
    approved: boolean;
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
export type Category = 'PartyCatering' | 'Clothing' | 'Games' | 'Books' | 'Electronics' | 'MovingTransport' | 'ClassesTutoring' | 'HouseholdCleaning'
export type Type = 'Sell' | 'Lend' | 'Hire'