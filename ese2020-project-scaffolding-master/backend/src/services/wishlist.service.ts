import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { Product, } from '../models/product.model';
import { PurchaseRequest, PurchaseResponse } from '../models/purchase.model';
import { Transaction } from 'sequelize/types';
import { Server} from '../server';
import { Wish } from '../models/wish.model';




export class WishlistService {

    public async getWishlist(userId: number) {

        try {
            const wishes = await Wish.findAll({
                where: {
                    userId: userId
                }
            });
            return wishes;
        } catch (err) {
            return err;
        }
    }

}
