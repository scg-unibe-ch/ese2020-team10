import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { userInfo } from 'os';
import { SaleService } from '../services/sale.service';
import { ReviewService } from '../services/review.service';
import { Sale } from '../models/sale.model';

const reviewController: Router = express.Router();
const reviewService =  new ReviewService();


reviewController.post('/', verifyToken,
    (req: Request, res: Response) => {
        reviewService.create( req.body.productId, req.body.tokenPayload.userId, req.body.rating,
            req.body.reviewText, req.body.tokenPayload.userName).then(created =>
            res.send(created)).catch(err => res.send(err));
    }
);
reviewController.get('/reviews/:productId',  (req: Request, res: Response) => {
    reviewService.getReviewsByProduct(req.params.productId).then(found => res.send(found)).catch(err => {
        console.log(err);
        res.send(err);
    });
});




export const ReviewController: Router = reviewController;
