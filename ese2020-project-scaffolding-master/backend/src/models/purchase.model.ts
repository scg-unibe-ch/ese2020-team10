import { Sale } from './sale.model';

export interface PurchaseResponse {
    sale?: Sale;
    message?: string;
}

export interface PurchaseRequest {
    productId: number;
    deliveryAddress: string;
}
