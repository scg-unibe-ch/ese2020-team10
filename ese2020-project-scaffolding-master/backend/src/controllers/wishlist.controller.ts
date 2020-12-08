import express, { Router, Request, Response, response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { userInfo } from 'os';
import { WishlistService } from '../services/wishlist.service';
import { Wish } from '../models/wish.model';
import { request } from 'http';

const wishlistController: Router = express.Router();
const wishlistService =  new WishlistService();

wishlistController.post('/add/:productId', verifyToken,
    (req: Request, res: Response) => {
        Wish.create({
            'productId': Number(req.params.productId),
            'userId': req.body.tokenPayload.userId
        }).then(wish => res.send(wish)).catch(err => res.status(500).send(err));
    });
wishlistController.get('/', verifyToken,
    (req: Request, res: Response) => {
        wishlistService.getWishlist(req.body.tokenPayload.userId).then(wishlist =>
            res.send(wishlist)).catch(err => res.status(500).send(err));
    });

wishlistController.delete('/remove/:id', verifyToken,
    (req: Request, res: Response) => {
        Wish.findOne({where: {productId : req.params.id}})
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
    });

export const WishlistController: Router = wishlistController;
