import {Optional, Model, Sequelize, DataTypes } from 'sequelize';




export interface ProductAttributes{
    productId: number;
    title: string;
    price: number;
    description: string;
    location: string;
    sellOrLend: boolean;
    status: boolean;
    deliverable: boolean;
}

export interface ProductCreationAttributes extends Optional<Product, 'productId'> { }  

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes{
    productId!: number;
    title!: string;
    price!: number;
    description!: string;
    location!: string;
    sellOrLend!: boolean;
    status!: boolean;
    deliverable!: boolean;

    public static initialize(sequelize: Sequelize){
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
            description:{
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
            deliverable: {
                type: DataTypes.BOOLEAN,
            }
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }
}