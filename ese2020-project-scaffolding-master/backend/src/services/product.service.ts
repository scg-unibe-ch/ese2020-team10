import { ProductAttributes, Product } from '../models/product.model';
import { User} from '../models/user.model';


export class ProductService {


    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }
    public addProduct(product: ProductAttributes, user: User): Promise<ProductAttributes> {
        product.userId = user.userId;
        return Product.create(product).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }
    public deleteProduct() {

    }
    public updateProduct() {

    }
    public getProduct() {

    }
    public getProductsByUser() {

    }
}
