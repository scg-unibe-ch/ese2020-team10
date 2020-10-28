import { IntegerDataTypeConstructor, where } from 'sequelize/types';
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

    public getProductByCategory(category: any): Promise<Product[]> {
        return Product.findAll({where: {
            category: category
        }});
    }

    public getProductByType(type: any): Promise<Product[]> {
        return Product.findAll({where: {
            type : type
        }});
    }

    public getProductByUser(userId: any): Promise<Product[]> {
        return Product.findAll({ where: {
            userId : userId
        }});

    }

    public getUnapprovedProducts(): Promise<Product[]> {
        return Product.findAll({ where: {
                approved : '0'
            }});

    }
}
