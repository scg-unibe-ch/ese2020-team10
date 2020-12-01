import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import { Product, } from '../models/product.model';
import { SaleAttributes, Sale } from '../models/sale.model';
import { PurchaseRequest, PurchaseResponse } from '../models/purchase.model';
import { Server} from '../server';
import { SaleService } from './sale.service';
import { Review} from '../models/review.model';

const saleService = new SaleService();

export class ReviewService {
    public async getReviewsByProduct(productId: string) {
        return Review.findAll({
            where: {
                productId: productId
            }
        });


    }

    public async create(productId: number, userId: number, rating: number, reviewText: string, userName: string): Promise<Review> {
        const { Op } = require('sequelize');
        const sale = await Sale.findOne({
            where: {
                [Op.and]: [
                    { buyerId: userId },
                    { productId: productId }
                  ]
            }
        });
        if (!sale) {
            return Promise.reject({message: 'No sale corresponds to this review'});
        }
        const review = await Review.create({
            'saleId': sale.saleId,
            'productId': productId,
            'userId': userId,
            'rating': rating,
            'reviewText': reviewText,
            'userName': userName
        });
        return review;
    }
}
