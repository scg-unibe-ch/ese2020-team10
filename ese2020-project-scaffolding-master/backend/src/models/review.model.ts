import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Sale} from './sale.model';

export interface ReviewResponse {
    productId: number;
    productTitle: number;
    userId: number;
    userName: string;
    rating: number;
    reviewText: string;
    date: string;
}


export interface ReviewAttributes {
    reviewId: number;
    saleId: number;
    rating: number;
    reviewText: string;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'reviewId'> { }

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    reviewId!: number;
    saleId!: number;
    rating!: number;
    reviewText!: string;

    public static initialize(sequelize: Sequelize) {
        Review.init({
            reviewId: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            saleId: {
                type: DataTypes.INTEGER,
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
            onDelete: 'cascade',
            foreignKey: 'saleId'
        });
    }
}
