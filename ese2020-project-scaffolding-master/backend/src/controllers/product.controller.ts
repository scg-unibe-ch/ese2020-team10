import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { verifyToken } from '../middlewares/checkAuth';

const productController: Router = express.Router();
const productService = new ProductService();

productController.get('/productList',
    (req: Request, res: Response) => {
        productService.getAll().then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
);
productController.get('/productByCategory/:category',
    (req: Request, res: Response) => {
        productService.getProductByCategory(req.params.category).then(products =>
            res.send(products)).catch(err => res.status(500).send(err));
    }
);
productController.get('/productByType/:type',
    (req: Request, res: Response) => {
        productService.getProductByType(req.params.type).then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
);
productController.get('/productByUser/:user',
    (req: Request, res: Response) => {
        productService.getProductByUser(req.params.user).then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
);

productController.post('/add', verifyToken,
(req: Request, res: Response) => {
    productService.addProduct(req.body, req.body.tokenPayload.userId).then(productAdded =>
        res.send(productAdded)).catch(err => res.status(500).send(err));
});

productController.delete('/:id', verifyToken,
(req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null && (found.userId === req.body.tokenPayload.userId || req.body.tokenPayload.isAdmin)) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

productController.put('/:id', verifyToken,
(req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null && (found.userId === req.body.tokenPayload.userId || req.body.tokenPayload.isAdmin)) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});


export const ProductController: Router = productController;
