import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User} from './user.model';
import {Product} from './product.model';




export interface SaleAttributes {
    SaleId: number;
    productId: number;
    buyerId: number;
    sellerId: number;
    pointOfSalePrice: number;
    deliveryAddress: string;

}

export interface SaleCreationAttributes extends Optional<SaleAttributes, 'SaleId'> { }

export class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
    SaleId: number;
    productId: number;
    buyerId: number;
    sellerId: number;
    pointOfSalePrice: number;
    deliveryAddress: string;

    public static initialize(sequelize: Sequelize) {
        Sale.init({
            SaleId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sellerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            pointOfSalePrice: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            deliveryAddress: {
                type: DataTypes.STRING,
            }
        },
            {
                sequelize,
                tableName: 'Sales'
            }
        );
    }
    public static createAssociations() {
        Sale.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'sellerId'
        });
        Sale.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'buyerId'
        });
        Sale.belongsTo(Product, {
            targetKey: 'productId',
            onDelete: 'cascade',
            foreignKey: 'productId'
        });
    }
}
