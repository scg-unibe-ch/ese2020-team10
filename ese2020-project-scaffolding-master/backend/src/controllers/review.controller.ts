import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { userInfo } from 'os';
import { SaleService } from '../services/sale.service';

const reviewController: Router = express.Router();
const saleService =  new SaleService();

reviewController.post('/', verifyToken,
    (req: Request, res: Response) => {
        saleService.buy(req.body, req.body.tokenPayload.userId).then(bought => res.send(bought)).catch(err => res.status(500).send(err));
    }
);
reviewController.get('/reviews/:productId', verifyToken, (req: Request, res: Response) => {
    saleService.getSoldSales(req.body.tokenPayload.userId).then(sold => res.send(sold)).catch(err => res.status(500).send(err));
});

reviewController.get('/bought', verifyToken, (req: Request, res: Response) => {
    saleService.getBoughtSales(req.body.tokenPayload.userId).then(bought => res.send(bought)).catch(err => res.status(500).send(err));
});



export const ReviewController: Router = reviewController;
