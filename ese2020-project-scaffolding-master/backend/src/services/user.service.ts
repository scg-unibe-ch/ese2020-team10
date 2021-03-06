import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { Op } from 'sequelize';


export class UserService {

    public async register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        const userWithSameUserName = await User.findOne({
            where: {
                userName: user.userName
            }
        });
        if (userWithSameUserName !== null) {
            return Promise.reject('username is occupied');
        }
        const userWithSameEmail = await User.findOne({
            where: {
                email: user.email
            }
        });
        if (userWithSameEmail !== null) {
            return Promise.reject('email is occupied');
        }

        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const { Op } = require('sequelize');
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                [Op.or]: [
                    { userName: loginRequestee.userName },
                    { email: loginRequestee.userName }
                  ]
            }
        })
        .then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId, isAdmin: user.isAdmin }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getUserId(userId: any): Promise<User[]> {
        return User.findAll({ where: {
                userId : userId
            }});
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
