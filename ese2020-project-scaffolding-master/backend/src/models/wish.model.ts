import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';

export interface WishAttributes {
    wishId: number;
    productId: number;
    userId: number;
}

export interface WishCreationAttributes extends Optional<WishAttributes, 'wishId'> { }

export class Wish extends Model<WishAttributes, WishCreationAttributes> implements WishAttributes {
    wishId!: number;
    productId!: number;
    userId!: number;

    public static initialize(sequelize: Sequelize) {
        Wish.init({
            wishId: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'wishs'
            }
        );
    }
    public static createAssociations() {
        Wish.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
        Wish.belongsTo(Product, {
            targetKey: 'productId',
            onDelete: 'cascade',
            foreignKey: 'productId'
        });
    }
}
