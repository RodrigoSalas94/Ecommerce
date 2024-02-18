import { DataTypes, Model } from 'sequelize'
import database from '../../connections/postgres/sequelize'
import UserModel from './userModel'
import ProductModel from './productModel'
import { Cart } from '../cart'

class CartModel extends Model<Cart> {
    public idcart!: number
    public quantity!: number
    public idusers!: number
    public idproducts!: number
}
CartModel.init (
    {
        idcart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idproducts: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductModel,
                key: 'idproducts',
            },
        },
        idusers: {
            type: DataTypes.INTEGER,
            references : {
                model: UserModel,
                key: 'idusers',
            },
        },
       
    },
    {
        sequelize:database,
        modelName: 'CartModel',
        tableName: 'cart',
        timestamps: false,
    }
)

export default CartModel