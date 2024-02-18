import { Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwtUtils'
import { AuthenticationRequest } from '../models/web/request'
import { clientRedis } from '../connections/redis/redis'
import { findUserById } from '../repositories/queries/userQueries'


export const authenticateToken = async (req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> => {
    
    const token = req.params.verificationToken ? req.params.verificationToken : req.header('Authorization')?.split(' ')[1]

   if (!token) {
        res.status(401).json({ error: 'Token no proporcionado' })
        return
    }

    try {
        const decodedToken = verifyToken(token)
        if (!decodedToken) {
            throw new Error('Token inválido')
        }

        req.user = decodedToken;

        const cacheKey = token;
        const userCache = await clientRedis.get(cacheKey)

        console.log('Token extraído:', token)
        console.log('Clave de la caché:', cacheKey)
        console.log('Valor de la caché para el token:', userCache)

        if (userCache) {
            const cachedUser = JSON.parse(userCache)
            console.log('Información del usuario almacenada en caché:', cachedUser)
            req.cachedUser = cachedUser
        }

        const userId = decodedToken.idusers
        req.userId = userId

        next()
    } catch (error) {
        console.error('Error al procesar el middleware:', error);
        res.status(401).json({ error: 'Token inválido o error en la caché' })
    }
}

export const authenticateUser = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
      
      const userId = req.user.idusers

     const user = await findUserById(userId)

      if (!user || !user.verified) {
          return res.status(401).json({ error: 'Usuario no verificado por correo electrónico' })
      }

      
      next()
  } catch (error) {
      console.error('Error en el middleware de verificación de email:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
  }
}
  
  

  