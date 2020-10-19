import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User} from './user.model';




export interface ProductAttributes {
    productId: number;
    title: string;
    price: number;
    description: string;
    location: string;
    sellOrLend: boolean;
    status: boolean;
    shippable: boolean;
    userId: number;

}

export interface ProductCreationAttributes extends Optional<Product, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    title!: string;
    price!: number;
    description!: string;
    location!: string;
    sellOrLend!: boolean;
    status!: boolean;
    shippable!: boolean;
    userId!: number;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            description: {
                type: DataTypes.STRING,
            },
            location: {
                type: DataTypes.STRING,
            },
            sellOrLend: {
                type: DataTypes.BOOLEAN,
            },
            status: {
                type: DataTypes.BOOLEAN,
            },
            shippable: {
                type: DataTypes.BOOLEAN,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }
    public static createAssociations() {
        Product.belongsTo(User, {
            targetKey: 'userId',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
