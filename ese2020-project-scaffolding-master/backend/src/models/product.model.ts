import {Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Review } from './review.model';
import { Sale } from './sale.model';
import { User} from './user.model';
import { Wish } from './wish.model';




export interface ProductAttributes {
    productId: number;
    category: Enumerator;
    title: string;
    price: number;
    description: string;
    location: string;
    type: Enumerator;
    status: boolean;
    shippable: boolean;
    userId: number;
    approved: boolean;
    picture: string;

}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    category!: Enumerator;
    title!: string;
    price!: number;
    description!: string;
    location!: string;
    type!: Enumerator;
    status!: boolean;
    shippable!: boolean;
    userId!: number;
    approved!: boolean;
    picture!: string;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            category: {
                type: DataTypes.ENUM('Accessories', 'AudioTV', 'Books', 'Clothing', 'Electronics', 'Games',
                    'Animals', 'ClassesTutoring', 'ComputerMobilePhones', 'HouseholdCleaning', 'MovingTransport', 'PartyCatering')
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
            type: {
                type: DataTypes.ENUM('Sell', 'Lend', 'Hire'),
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
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            picture: {
                type: DataTypes.STRING
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
        Product.hasMany(Sale, {
            foreignKey: 'productId'
        });
        Product.hasMany(Wish, {
            foreignKey: 'productId'
        });
        Product.hasMany(Review, {
            foreignKey: 'productId'
        });
    }
}
