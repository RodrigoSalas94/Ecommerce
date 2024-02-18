import { Response, NextFunction } from 'express'
import { AuthenticationRequest } from '../models/web/request'
import { getProductById } from '../services/productServices'


export const checkProductOwner = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    const productId = parseInt(req.params.idproducts)
    const userId = req.user.idusers
  
    try {
      const existingProduct = await getProductById(productId)
  
      if (!existingProduct) {
        throw new Error('Producto no encontrado')
      }
  
      if (existingProduct.idusers !== userId) {
        throw new Error('No tienes permiso para realizar esta acción')
      }
  
      
      next()
    } catch (error) {
      console.error('Error al verificar la propiedad del producto:', error)
      res.status(403).json({ error: 'No tienes permiso para realizar esta acción' })
    }
  }