import express from 'express'
import { addToCartController, purchaseProductController,getCartController } from '../controllers/cartControllers'
import { authenticateUser, authenticateToken } from '../middleware/authMiddleware'


const cartRoutes = express.Router()

cartRoutes.post('/cart/add/:idproducts',authenticateToken, authenticateUser, addToCartController)
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Operaciones relacionadas con el carrito
 * paths:
 *   /cart/add/{idproducts}:
 *     post:
 *       tags:
 *         - Cart
 *       summary: Agrega un producto al carrito
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idproducts
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del producto
 *       responses:
 *         '200':
 *           description: Producto agregado al carrito correctamente

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '500':
 *           description: Error al agregar el producto al carrito

 */
cartRoutes.post('/cart/purchase/:idcart', authenticateToken, purchaseProductController)
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Operaciones relacionadas con el carrito
 * paths:
 *   /cart/purchase/{idcart}:
 *     post:
 *       tags:
 *         - Cart
 *       summary: Compra un producto del carrito
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idcart
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del carrito
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idproducts:
 *                   type: integer
 *                   description: ID del producto
 *                   example: 1
 *       responses:
 *         '200':
 *           description: Producto comprado correctamente

 *         '400':
 *           description: Valores de parámetros no válidos

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '500':
 *           description: Error al comprar el producto en el carrito

 */
cartRoutes.get('/cart/:idcart', getCartController)
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Operaciones relacionadas con el carrito
 * paths:
 *   /cart/{idcart}:
 *     get:
 *       tags:
 *         - Cart
 *       summary: Obtiene un carrito por su ID
 *       parameters:
 *         - in: path
 *           name: idcart
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del carrito
 *       responses:
 *         '200':
 *           description: 

 *         '500':
 *           description: Error al obtener el carrito por ID

 */

export default cartRoutes