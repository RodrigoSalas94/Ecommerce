import database from "./sequelize"

async function dbConnection() {
    try {
        await database.authenticate()
        console.log('Database Online')
    }
    catch (error) {
        console.error('Error al conectar a la base de datos', error)
        throw error
    }
}
dbConnection()