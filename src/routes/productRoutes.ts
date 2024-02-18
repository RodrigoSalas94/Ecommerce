import express from 'express'
import { addProductController, getProductByIdController, getAllProductsController, deleteProductController, updateProductController } from '../controllers/productControllers'
import { authenticateUser, authenticateToken } from '../middleware/authMiddleware'
import { checkProductOwner } from '../middleware/productMiddleware'


const productRoutes = express.Router()

productRoutes.post('/products/add',authenticateToken,authenticateUser,addProductController)
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operaciones relacionadas con los productos
 * paths:
 *   /products/add:
 *     post:
 *       tags:
 *         - Products
 *       summary: Añade un nuevo producto
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                   example: "Producto Ejemplo"
 *                 description:
 *                   type: string
 *                   description: Descripción del producto
 *                   example: "Este es un producto de ejemplo"
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                   example: 100.50
 *                 quantity:
 *                   type: integer
 *                   description: Cantidad del producto
 *                   example: 10
 *       responses:
 *         '200':
 *           description: Producto añadido correctamente

 *         '400':
 *           description: Datos de producto inválidos
 
 *         '401':
 *           description: Token no proporcionado o usuario no verificado por correo electrónico

 *         '500':
 *           description: Error general al agregar el producto, Error interno del servidor

 */
productRoutes.get('/products/:idproducts',authenticateToken, getProductByIdController)
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operaciones relacionadas con los productos
 * paths:
 *   /products/{idproducts}:
 *     get:
 *       tags:
 *         - Products
 *       summary: Obtiene un producto por su ID
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
 *           description: Producto obtenido correctamente

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '404':
 *           description: Producto no encontrado

 *         '500':
 *           description: Error al obtener el producto por ID

 */
productRoutes.get('/products/getall',authenticateToken, getAllProductsController)
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operaciones relacionadas con los productos
 * paths:
 *   /products/getall:
 *     get:
 *       tags:
 *         - Products
 *       summary: Obtiene todos los productos
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Lista de productos obtenida correctamente

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '404':
 *           description: No se encontraron productos

 *         '500':
 *           description: Error al obtener los productos

 */
productRoutes.put('/products/update/:idproducts',authenticateToken, checkProductOwner, updateProductController)
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operaciones relacionadas con los productos
 * paths:
 *   /products/update/{idproducts}:
 *     put:
 *       tags:
 *         - Products
 *       summary: Actualiza un producto específico
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idproducts
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del producto
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                   example: "Producto Ejemplo"
 *                 description:
 *                   type: string
 *                   description: Descripción del producto
 *                   example: "Este es un producto de ejemplo"
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                   example: 100.50
 *       responses:
 *         '200':
 *           description: Producto actualizado correctamente

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '403':
 *           description: No tienes permiso para realizar esta acción

 *         '404':
 *           description: Producto no encontrado

 *         '500':
 *           description: Error al actualizar el producto
 
 */
productRoutes.delete('/products/:idproducts',authenticateToken, checkProductOwner, deleteProductController)
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operaciones relacionadas con los productos
 * paths:
 *   /products/{idproducts}:
 *     delete:
 *       tags:
 *         - Products
 *       summary: Elimina un producto específico
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
 *           description: Producto eliminado exitosamente

 *         '401':
 *           description: Token no proporcionado, Token inválido o error en la caché

 *         '403':
 *           description: No tienes permiso para realizar esta acción

 *         '500':
 *           description: Error al eliminar el producto

 */

export default productRoutes