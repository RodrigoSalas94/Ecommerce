import ProductModel from "../../models/schemas/productModel"
import { Product } from "../../models/products"
import { ProductState, AddProduct, UpdateProduct } from "../../models/types/productRequests"


export const addProductQuery = async (productData: AddProduct, idusers: number): Promise<Product> => {
  try {
      const newProduct = await ProductModel.create({ ...productData, idusers })
      return newProduct
  } catch (error) {
      console.error('Error al crear el producto en la base de datos:', error)
      throw new Error('Error al crear el producto')
  }
}

 export const getProductByIdQuery = async (idproducts: number): Promise<Product | null> => {
    try {
      const product = await ProductModel.findByPk(idproducts)
      return product
    } catch {
      throw new Error('Error al obtener el producto')
    }
  }

  export const updateProductQuery = async (idproducts: number, updated: UpdateProduct): Promise<void> => {
    if (isNaN(idproducts)) {
      throw new Error('ID de producto no válido')
    }
  
    const product = await ProductModel.findByPk(idproducts)
  
    if (!product) {
      throw new Error('Producto no encontrado')
    } else {
      product.name = updated.name || product.name
      product.description = updated.description || product.description
      product.price = updated.price || product.price
  
      await product.save()
      
    }
  }

  export const deleteProductQuery = async (idproducts: number): Promise<void> => {
    try {
      const product = await ProductModel.findByPk(idproducts)
      if (!product) {
        throw new Error('Producto no encontrado')
      }
  
      await ProductModel.destroy(  {where: { idproducts: idproducts} } )
  
    } catch {
      throw new Error ('Error al eliminar el producto')
    }
  }

  export const updateProductQuantityQuery = async (idproducts: number, updatedQuantity: number): Promise<void> => {
    try {
      await ProductModel.update(
        { quantity: updatedQuantity },
        { where: { idproducts: idproducts } }
      )
    } catch {
      throw new Error('Error al actualizar la cantidad del producto');
    }
  }

  
export const getAllProductsQuery = async (): Promise<Product[]> => {
    try {
      const allProducts = await ProductModel.findAll()
      return allProducts
    } catch {
      throw new Error('Error al obtener todos los productos')
    }
  }


  export const updateProductStateQuery = async (idproducts: number, newState: ProductState): Promise<ProductState> => {
    try {
        const product = await ProductModel.findByPk(idproducts)
    
        if (product) {
            await product.update({ state: newState })
            return newState
        } else {
            throw new Error('Producto no encontrado')
        }
    } catch (error) {
        console.error('Error al actualizar el estado del producto en la base de datos:', error)
        throw new Error('Error al actualizar el estado del producto en la base de datos')
    }
}