import { DataTypes, Model } from 'sequelize'
import database from '../../connections/postgres/sequelize'
import permissionModel from './permissionModel'
import { Role } from '../role'

class RoleModel extends Model<Role> {
    
    public rolename!: string
    public permissionname!: string
}
RoleModel.init (
    {
        rolename: {
            type: DataTypes.STRING,
            primaryKey: true,
            
        },
        permissionname: {
            type: DataTypes.STRING,
            references: {
                model: permissionModel,
                key: 'permissionname',
            },
        },
    },
    {
        sequelize: database,
        modelName: 'RoleModel',
        tableName: 'roles',
        timestamps: false,
    }
)

export default RoleModel