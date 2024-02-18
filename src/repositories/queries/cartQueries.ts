import CartModel from "../../models/schemas/cartModel"
import { AddProduct, PurchaseProduct } from "../../models/types/cartRequest";


export const getCartQuery = async (idcart: number): Promise<CartModel | null> => {
  try {
    const cart = await CartModel.findByPk(idcart);
    return cart;
  } catch (error: any) {
    console.error(`Error al obtener el carrito`);
    throw new Error('Error al obtener el carrito: ' + error.message);
  }
};


export const addToCartQuery = async (ProductCart: AddProduct): Promise<void> => {
  try {
   
    await CartModel.create({
      idusers: ProductCart.idusers,
      idproducts: ProductCart.idproducts
    })

    console.log('Producto agregado al carrito correctamente')
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error)
    throw new Error('Error al agregar el producto al carrito')
  }
}


export const purchaseProductCartQuery = async (ProductCart: PurchaseProduct): Promise<void> => {
    try {
      
      const productInCart = await CartModel.findOne({
        where: {
          idcart: ProductCart.idcart,
          idproducts: ProductCart.idproducts
        }
      })
      
  
      if (!productInCart) {
        throw new Error('El producto no existe en el carrito')
      }
  
      
      if (productInCart.quantity === 0) {
        throw new Error('El producto ya ha sido comprado')
      }
  
      productInCart.quantity = 0
  
      await productInCart.save()
  
      console.log('Producto comprado correctamente en el carrito')
      } catch {
      throw new Error('Error al comprar el producto en el carrito')
    }
  }

  export const updateCartTotalQuantity = async (idcart: number): Promise<void> => {
    try {
      
      const totalQuantity = await CartModel.sum('quantity', { where: { idcart } })
  
      if (totalQuantity !== null) {
       
        await CartModel.update({ quantity: totalQuantity }, { where: { idcart } })
        console.log('Cantidad total del carrito actualizada correctamente')
      } else {
        throw new Error('No se pudo obtener la cantidad total del carrito')
      }
    } catch (error) {
      console.error(`Error al actualizar la cantidad total del carrito`)
      throw new Error('Error al actualizar la cantidad total del carrito')
    }
  }

