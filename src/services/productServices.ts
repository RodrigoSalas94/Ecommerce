import { addProductQuery, getProductByIdQuery, updateProductQuery, deleteProductQuery, getAllProductsQuery } from "../repositories/queries/productQueries"
import { Product } from "../models/products"
import { UpdateProduct } from "../models/types/productRequests"




export const addProduct = async (productData: Product, idusers: number): Promise<Product> => {
  try {
      console.log('Información del producto:', productData)
      const newProduct = await addProductQuery(productData, idusers)

      if (!newProduct) {
          throw new Error('Error al agregar el producto')
      } else {
          console.log('Producto añadido correctamente')
          return newProduct
      }
  } catch (error) {
      throw new Error(`Error al agregar el producto`)
  }
}


export const getProductById = async (idproducts: number): Promise<Product | null> => {
    try {
      const product = await getProductByIdQuery(idproducts)
      if(!product) {
        throw new Error ('Producto no encontrado')
      } else {
        console.log('Producto obtenido exitosamente')
      }
      return product
    } catch{
      throw new Error('Error al obtener el producto por ID')
    }
}

export const updateProduct = async (idproducts: number, updated: UpdateProduct): Promise<void> => {
  try {
   
      await updateProductQuery(idproducts, updated)
      
      console.log('Producto modificado con éxito')
    
    } catch (error) {
      console.error('Error al modificar el producto:', error)
      throw new Error('Error al modificar el producto')
    }
  }
export const deleteProductService = async (idproducts: number): Promise<void> => {
  try {
    
      await deleteProductQuery(idproducts)

   } catch {
      throw new Error('Error al eliminar el producto')
  }
}

export const getAllProductsService = async (): Promise<Product[]> => {
    try {
          const allProducts = await getAllProductsQuery()
          console.log('Productos obtenidos correctamente')
          return allProducts
        } catch {
            throw new Error ('Error al obtener los productos')
        }
}
  
