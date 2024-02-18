import { Sequelize } from "sequelize"


const database = new Sequelize ('Ecommerce', 'postgres', '142asd182', {
    host: 'localhost',
    dialect: 'postgres',
})

export default database