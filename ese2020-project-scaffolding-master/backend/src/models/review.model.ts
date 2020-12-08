import { type } from 'os';
import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';
import { Sale} from './sale.model';
import { User } from './user.model';



export interface ReviewAttributes {
    reviewId: number;
    sellerId: number;
    saleId: number;
    productId: number;
    userId: number;
    userName: string;
    rating: number;
    reviewText: string;

}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'reviewId'> { }

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    reviewId!: number;
    sellerId: number;
    saleId!: number;
    productId!: number;
    userId!: number;
    userName!: string;
    rating!: number;
    reviewText!: string;

    public static initialize(sequelize: Sequelize) {
        Review.init({
            reviewId: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            sellerId: {
                type: DataTypes.INTEGER
            },
            saleId: {
                type: DataTypes.INTEGER,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            reviewText: {
                type: DataTypes.STRING,
            }
        },
            {
                sequelize,
                tableName: 'reviews'
            }
        );
    }
    public static createAssociations() {
        Review.belongsTo(Sale, {
            targetKey: 'saleId',
            onDelete: 'set null',
            foreignKey: 'saleId'
        });
        Review.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'set null',
            foreignKey: 'userId'
        });
        Review.belongsTo(Product, {
            targetKey: 'productId',
            onDelete: 'set null',
            foreignKey: 'productId'
        });
    }
}
