import { IntegerDataTypeConstructor } from 'sequelize/types';
import { ProductAttributes, Product } from '../models/product.model';
import { User} from '../models/user.model';


export class ProductService {


    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }

    public addProduct(product: ProductAttributes, userId: number): Promise<ProductAttributes> {
        product.userId = userId;
        return Product.create(product).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    /**public deleteProduct(productId: number, userId: number) : void{
        let product = Product.findByPk(productId);
        let user = User.findByPk(userId);
        if(user.isAdmin || userId == product.userId){
            product.des
        }
    }*/
    public updateProduct() {

    }
    public getProduct() {

    }
    public getProductsByUser() {

    }
}
