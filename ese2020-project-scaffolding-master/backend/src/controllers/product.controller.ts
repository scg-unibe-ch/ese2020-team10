import express from 'express';
import { Router, Request, Response } from 'express';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.get('/productList',
    (req: Request, res: Response) => {
        productService.getAll().then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
);

productController.post('/', (req: Request, res: Response) => {
    Product.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

productController.put('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));

});

productController.delete('/:id', (req: Request, res: Response) => {
    Product.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const ProductController: Router = productController;