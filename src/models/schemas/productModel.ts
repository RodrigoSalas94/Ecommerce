import { DataTypes, Model } from 'sequelize'
import database from '../../connections/postgres/sequelize'
import UserModel from './userModel'
import { Product } from '../products'

class ProductModel extends Model<Product> {
    public idproducts!: number
    public name!: string
    public description!: string
    public price!: number
    public quantity!: number
    public idusers!: number
    public state!:   'in_cart' | 'purchased' | 'active' | 'inactive'
}
ProductModel.init (
    {
        idproducts: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM('in_cart', 'purchased', 'active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        },
        idusers: {
            type: DataTypes.INTEGER,
            references: {
                model: UserModel,
                key: 'idusers'
            }
        },
    },
    {
        sequelize:database,
        modelName: 'ProductModel',
        tableName: 'products',
        timestamps: false,
    }
)

export default ProductModel