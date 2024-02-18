import express from 'express'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import swaggerUi, { setup } from 'swagger-ui-express'
import { swaggerSpec } from '../swagger'


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 1234

app.use ([userRoutes,productRoutes,cartRoutes])

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
})