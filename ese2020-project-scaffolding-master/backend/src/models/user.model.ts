import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

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
            city: {
                type: DataTypes.STRING,
                // allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}
