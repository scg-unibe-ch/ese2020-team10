import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { userInfo } from 'os';
import { SaleService } from '../services/sale.service';

const saleController: Router = express.Router();
const saleService =  new SaleService();

saleController.post('/buy', verifyToken,
    (req: Request, res: Response) => {
        saleService.buy(req.body, req.body.tokenPayload.userId).then(bought => res.send(bought)).catch(err => res.status(500).send(err));
    }
);
saleController.get('/sold', verifyToken, (req: Request, res: Response) => {
    saleService.getSoldSales(req.body.tokenPayload.userId).then(sold => res.send(sold)).catch(err => res.status(500).send(err));
});

saleController.get('/bought', verifyToken, (req: Request, res: Response) => {
    saleService.getBoughtSales(req.body.tokenPayload.userId).then(bought => res.send(bought)).catch(err => res.status(500).send(err));
});

saleController.get('/:productId', verifyToken,
    (req: Request, res: Response) => {
    saleService.getSalesForReview(req.params.productId, req.body.tokenPayload.userId).then(found =>
        res.send(found)).catch(err => res.status(500).send(err));
});

export const SaleController: Router = saleController;
