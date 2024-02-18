import express from 'express'
import { getUserController, registerUserController, loginUserController, updateUserController, desactivateUserController, reactivateUserController, verifyEmailController } from "../controllers/userControllers"
import { authenticateToken } from '../middleware/authMiddleware'


const routes = express.Router()

routes.get('/users/:idusers', authenticateToken, getUserController)
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 * paths:
 *   /users/{idusers}:
 *     get:
 *       summary: Obtiene los datos de un usuario por su ID
 *       tags: 
 *       - Users
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idusers
 *           required: true
 *           schema:
 *             type: integer
 *           description: El ID del usuario
 *       responses:
 *         '200':
 *           description: Datos del usuario

 *         '401':
 *           description: Token no proporcionado o inválido, o error en la caché

 *         '404':
 *           description: Usuario no encontrado

 *         '500':
 *           description: Error al obtener el usuario

 */
routes.post('/register', registerUserController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /register:
 *     post:
 *       tags:
 *         - Users
 *       summary: Registra un nuevo usuario
 *       requestBody:
 *         description: Datos del usuario para registrarse
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario
 *       responses:
 *         '200':
 *           description: Usuario registrado correctamente

 *         '400':
 *           description: Datos de usuario inválidos

 *         '500':
 *           description: Error al registrar el usuario

 */
routes.post('/login',loginUserController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /login:
 *     post:
 *       tags:
 *         - Users
 *       summary: Inicia sesión un usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario

 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario

 *       responses:
 *         '200':
 *           description: Inicio de sesión exitoso

 *         '400':
 *           description: Datos de inicio de sesión inválidos

 *         '401':
 *           description: Error al iniciar sesión

 */
routes.put('/users/update',authenticateToken, updateUserController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /users/update:
 *     put:
 *       tags:
 *         - Users
 *       summary: Actualiza los datos de un usuario específico
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
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario
 *       responses:
 *         '200':
 *           description: Usuario actualizado correctamente


 *         '400':
 *           description: Datos de actualización de usuario inválidos

 *         '401':
 *           description: Token no proporcionado o inválido, o error en la caché

 *         '500':
 *           description: Error al actualizar el usuario

 */
routes.put('/users/desactivate',authenticateToken, desactivateUserController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /users/desactivate:
 *     put:
 *       tags:
 *         - Users
 *       summary: Desactiva un usuario específico por el token
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Usuario desactivado correctamente
 *         '401':
 *           description: Token no proporcionado o inválido, o error en la caché

 *         '500':
 *           description: Error al desactivar el usuario

 */

routes.put('/users/reactivate',authenticateToken, reactivateUserController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /users/reactivate:
 *     put:
 *       tags:
 *         - Users
 *       summary: Reactiva un usuario específico por el token
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Usuario reactivado correctamente
 *         '401':
 *           description: Token no proporcionado o inválido, o error en la caché

 *         '500':
 *           description: Error al reactivar el usuario

 */
routes.get('/verify/:verificationToken',authenticateToken, verifyEmailController)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 * paths:
 *   /verify/{verificationToken}:
 *     get:
 *       tags:
 *         - Users
 *       summary: Verifica el correo electrónico de un usuario específico
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: verificationToken
 *           required: true
 *           schema:
 *             type: string
 *           description: El token de verificación del correo electrónico
 *       responses:
 *         '200':
 *           description: Correo electrónico verificado

 *         '401':
 *           description: Token no proporcionado 

 *         '500':
 *           description: Error al verificar el correo electrónico

 */

export default routes
