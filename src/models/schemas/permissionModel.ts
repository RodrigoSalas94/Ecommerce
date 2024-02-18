import { DataTypes, Model } from 'sequelize'
import database from '../../connections/postgres/sequelize'
import { Permission } from '../permission'

class permissionModel extends Model<Permission> {
    public permissionname! : string
}
permissionModel.init({
   
    permissionname: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }
},
{
    sequelize: database,
    modelName: 'permissionModel',
    tableName: 'permissions',
    timestamps: false,
})

export default permissionModel