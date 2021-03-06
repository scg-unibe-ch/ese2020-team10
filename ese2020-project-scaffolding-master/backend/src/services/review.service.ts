import {  Sale } from '../models/sale.model';
import { SaleService } from './sale.service';
import { Review} from '../models/review.model';
import { Product } from '../models/product.model';

const saleService = new SaleService();

export class ReviewService {
    public async getReviewsByProduct(productId: string) {
        return Review.findAll({
            where: {
                productId: productId
            }
        });


    }
    public async getReviewsByProductAndUser(productId: string, userId: number): Promise<Review> {
        const { Op } = require('sequelize');
        const review = Review.findOne({
            where: {
                [Op.and]: [
                    { userId: userId },
                    { productId: Number(productId) }
                ]
            }
        });
        if (!review) {
            return Promise.reject({message: 'No sale with this product and user'});
        }
        return review;


    }

    public async getSellerReviews(proudctId: string): Promise<Review[]> {
        const { Op } = require('sequelize');
        const product = await Product.findByPk(proudctId);

        const reviews = await Review.findAll({
            where: {
                [Op.and]: [
                    { sellerId: product.userId },
                    { productId: {[Op.ne]: proudctId} }
                ]
            }
        });
        return reviews;
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
            'sellerId': sale.sellerId,
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
