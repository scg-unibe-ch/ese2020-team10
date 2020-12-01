import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product} from './product.model';
import { Review } from './review.model';
import { Sale} from './sale.model';
import { Wish } from './wish.model';

export interface UserAttributes {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    wallet: number;
    isAdmin: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    password!: string;
    phone: string;
    address: string;
    city: string;
    wallet: number;
    isAdmin!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            lastName: {
                type : DataTypes.STRING,
                // allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            wallet: {
                type: DataTypes.NUMBER,
                defaultValue: 0
            },
            city: {
                type: DataTypes.STRING,
                // allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
    public static createAssociations() {
        User.hasMany(Product, {
            foreignKey: 'userId'
        });
        User.hasMany(Sale, {
            foreignKey: 'buyerId'
        });
        User.hasMany(Wish, {
            foreignKey: 'userId'
        });
        User.hasMany(Review, {
            foreignKey: 'userId'
        });
    }
}
