import { DataTypes, Model } from 'sequelize'
import database from '../../connections/postgres/sequelize'
import RoleModel from './roleModel'
import { User } from '../user'

class UserModel extends Model<User> {
    public idusers!: number
    public name!: string
    public email!: string
    public password!: string
    public active!: boolean
    public verified!: boolean
    public rolename!: string
    
}
UserModel.init (
    {
        idusers: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        rolename: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
            references: {
                model: RoleModel,
                key: 'rolename'
            },
        },
    },
    {
        sequelize: database,
        modelName: 'UserModel',
        tableName: 'users',
        timestamps: false,
    }
)

export default UserModel