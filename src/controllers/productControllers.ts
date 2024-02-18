import { Response, Request } from "express"
import { addProduct, getProductById, updateProduct, deleteProductService, getAllProductsService } from "../services/productServices"
import { AuthenticationRequest } from "../models/web/request"


export const addProductController = async (req: AuthenticationRequest, res: Response) => {
  try {
    const { productData } = req.body
    const idusers = req.user. idusers

    const newProduct = await addProduct(productData, idusers)

    console.log('Producto añadido correctamente')
    res.json(newProduct)
  } catch (error) {
    
    res.status(500).json({ error: 'Error general al agregar el producto' })
  }
}



export const getProductByIdController = async (req: Request, res: Response) => {
  try {
      const { idproducts } = req.params

      const product = await getProductById(+idproducts)

      if (!product) {
          throw new Error('Producto no encontrado')
      } else {
          console.log('Producto obtenido exitosamente')
          res.json(product);
      }
  } catch (error) {
      
      res.status(500).json({ error: 'Error al obtener el producto por ID' })
  }
}

export const updateProductController = async (req: AuthenticationRequest, res: Response) => {
    const productId = parseInt(req.params.idproducts)
    const { name, description, price } = req.body
  
    try {
      
     await updateProduct(productId, { name, description, price })
  
      
    } catch (error) {
      
      res.status(500).json({ error: 'Error al actualizar el producto' })
    }
  }

  export const deleteProductController = async (req: AuthenticationRequest, res: Response) => {
    const productId = parseInt(req.params.idproducts)
  
    try {
     
      await deleteProductService(productId)
  
      res.json({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
      
      res.status(500).json({ error: 'Error al eliminar el producto' })
    }
  }

  export const getAllProductsController = async (req: Request, res: Response) => {
    try {
      const allProducts = await getAllProductsService()
  
      if (allProducts.length === 0) {
        res.status(404).json({ message: 'No se encontraron productos' })
      } else {
        res.json(allProducts)
      }
    } catch (error) {
      
      res.status(500).json({ error: 'Error al obtener los productos' })
    }
  }