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
    title: string;
    type: Enumerator;
    amountOfHours: number;
}

export interface SaleCreationAttributes extends Optional<SaleAttributes, 'SaleId'> { }

export class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
    SaleId: number;
    productId: number;
    buyerId: number;
    sellerId: number;
    pointOfSalePrice: number;
    deliveryAddress: string;
    title: string;
    type: Enumerator;
    amountOfHours: number;

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
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.ENUM('Sell', 'Lend', 'Hire'),
            },
            amountOfHours: {
                type: DataTypes.NUMBER
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
            onDelete: 'set null',
            foreignKey: 'sellerId'
        });
        Sale.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'set null',
            foreignKey: 'buyerId'
        });
        Sale.belongsTo(Product, {
            targetKey: 'productId',
            onDelete: 'set null',
            foreignKey: 'productId'
        });
    }
}
