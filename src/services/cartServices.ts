import { addToCartQuery, getCartQuery, purchaseProductCartQuery } from "../repositories/queries/cartQueries"
import { updateProductQuantityQuery } from "../repositories/queries/productQueries"
import { Tickets } from "../models/ticket"
import { Cart } from "../models/cart"
import { updateProductStateQuery } from "../repositories/queries/productQueries"
import { createTicket,getProductPriceQuery } from "../repositories/queries/ticketQueries"
import { AddProduct, ProductCart } from "../models/types/cartRequest"


export const getCart = async (idcart: number): Promise <Cart > => {
  try {
    const cart = await getCartQuery(idcart)
    if(!cart) {
      throw new Error ('Producto no encontrado')
    } else {
      console.log('Producto obtenido exitosamente')
    }
    return cart
  } catch{
    throw new Error('Error al obtener el producto por ID')
  }
}

export const addToCart = async (ProductCart: AddProduct): Promise<void> => {
  try {
   
    await addToCartQuery(ProductCart);

    console.log('Producto agregado al carrito correctamente desde el servicio')
  } catch {
    
    throw new Error('Error al agregar el producto al carrito desde el servicio')
  }
}
export const PurchaseProduct = async (ProductCart: ProductCart): Promise<Tickets> => {
  try {
    const productState = await updateProductStateQuery(ProductCart.idproducts, 'purchased')
    if (productState === 'purchased') {
        throw new Error('El producto ya ha sido comprado y no está disponible.')
    }
    const cart = await getCartQuery(ProductCart.idcart);

    
    if (!ProductCart.idusers || !cart) {
      throw new Error('El usuario o el carrito no existen')
    }

    const result = await purchaseProductCartQuery(ProductCart)

    const updateQuantity = -1
    await updateProductQuantityQuery(ProductCart.idproducts, updateQuantity)

    const productPrice = await getProductPriceQuery(ProductCart.idproducts)

   const total = productPrice

   const ticketData = {
      idusers: ProductCart.idusers,
      idproducts: ProductCart.idproducts,
      total: total,
      date: new Date()
    }

    const ticket = await createTicket(ticketData)
    await updateProductStateQuery (ProductCart.idproducts, 'purchased')
   return  ticket
  } catch {
    
    throw new Error('Error al comprar el producto en el carrito')
  }
}
