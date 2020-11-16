import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { Product} from '../models/product.model';
import { SaleAttributes, Sale } from '../models/sale.model';



export class SaleService {

    public buy(sale: SaleAttributes, buyerId: number): Promise<SaleAttributes> {
        // find the product to sell
        Product.findByPk(sale.productId).then(foundProduct => {
            if (foundProduct != null) {
                // set the current sale price
                sale.pointOfSalePrice = foundProduct.price;
                // make product unavailable
                foundProduct.update({shippable: false}).then();
                // find buyer and decrease its waller by sellingprice
                User.findByPk(buyerId).then(foundBuyer => {
                    if (foundBuyer != null) {
                        foundBuyer.decrement(['wallet'], {by: sale.pointOfSalePrice});
                    } else {
                        return Promise.reject({ message: 'buyer not found'});
                    }
                });
                // find yeller and increase its wallet by sellingprice
                User.findByPk(foundProduct.userId).then(foundSeller => {
                    if (foundSeller != null) {
                        foundSeller.increment(['wallet'], {by: sale.pointOfSalePrice});
                    } else {
                        return Promise.reject({ message: 'seller not found'});
                    }
                });
            } else {
                return Promise.reject({ message: 'product not found'});
            }

        });
        return Sale.create(sale).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }
}
