
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {Product} from '../models/product.model';
import {User} from '../models/user.model';
import bcrypt from 'bcrypt';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/:user',
    (req: Request, res: Response) => {
        userService.getUserId(req.params.user).then(products => res.send(products)).catch(err => res.status(500).send(err));
    });

userController.put('/:id', verifyToken,
    (req: Request, res: Response) => {
        const saltRounds = 12;
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

        User.findByPk(req.params.id)
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

export const UserController: Router = userController;
