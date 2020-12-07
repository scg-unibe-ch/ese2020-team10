import { ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core'

export class Product {
    productId: number;
    category: string;
    title: string;
    price: number;
    description: string;
    location: string;
    type: ProductType;
    sellOrLend: boolean;
    status: boolean;
    shippable: boolean;
    userId: number;
    approved: boolean;
    picture:string;
    onWishlist:boolean;
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
        approved: boolean,
        picture: string,
        onwishlist: boolean
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

export type Category = 'Accessories' | 'AudioTV' | 'Books' | 'Clothing' | 'Electronics' | 'Games' | 'Animals' | 'ClassesTutoring' | 'ComputerMobilePhones' | 'HouseholdCleaning' | 'MovingTransport' | 'PartyCatering'

export type ProductType = 'Sell' | 'Lend' | 'Hire'

export class Sale {
  buyerId: number;
  sellerId: number;
  pointOfSalePrice: number;
  deliveryAddress: string;
  amountOfHours: number;
  title: string;
  type: ProductType;
}

export class Wish {
  wishId: number;
  userId: number;
  productId: number;
}

export class Review {
  reviewId: number;
  saleId: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  reviewText: string;
}
