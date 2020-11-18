import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { Product} from '../models/product.model';
import { SaleAttributes, Sale } from '../models/sale.model';
import { PurchaseRequest, PurchaseResponse } from '../models/purchase.model';
import { Transaction } from 'sequelize/types';
import { Server} from '../server';



// const sequelize = require('sequelize');

export class SaleService {
    async buy(purchaseRequest: PurchaseRequest, buyerId: number): Promise<Sale | PurchaseResponse> {
        try {
            // find the product to sell
            const product = await Product.findByPk(purchaseRequest.productId);
            // make sure the product is there
            if (product == null) {
                throw new Error('Product not found');
            }
            // make sure product is shippable
            if (!product.status) {
                throw new Error('Product is not available');
            }
            // find buyer
            const buyer = await User.findByPk(buyerId);
            // make sure the buyer has sufficient money
            if (buyer.wallet < product.price) {
                throw new Error('Insufficient funds');
            }
            // find seller
            const seller = await User.findByPk(product.userId);

            // cant use transaction yet because it requires sequelize
            try {
                // make product unavailable
                await product.update({status: false});

                // decrease the buyers wallet by sellingprice
                await buyer.update({wallet: buyer.wallet - product.price});

                // increase the sellers wallet by sellingprice
                await seller.update({wallet: seller.wallet + product.price});

                // make a entry in the sales table
                const sale = await Sale.create({
                    'productId': product.productId,
                    'buyerId': buyerId,
                    'sellerId': seller.userId,
                    'pointOfSalePrice': product.price,
                    'deliveryAddress': purchaseRequest.deliveryAddress,
                    'title': product.title,
                    'type': product.type
                });

                return Promise.resolve(sale);
            } catch (err) {
                throw new Error(err);
            }


        } catch (err) {
            console.log(err);
            return Promise.reject({message: err.toString()});
        }
    }
    public getSoldSales(userid: number): Promise<Sale[]> {
        return Sale.findAll({
            where: {
                sellerId: userid
            }
        });
    }

    public getBoughtSales(userid: number): Promise<Sale[]> {
        return Sale.findAll({
            where: {
                buyerId: userid
            }
        });
    }

}
