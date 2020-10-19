import { Product } from '../models/product.model';


export class ProductService {


    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }
}
