import { Response } from "express"
import { AuthenticationRequest } from "../models/web/request"
import { addToCart, PurchaseProduct, getCart } from "../services/cartServices"


export const getCartController = async (req: AuthenticationRequest, res: Response)=> {
  try {
    const idcart = +req.params.idcart

    const cart = await getCart(idcart)

    res.json(cart)
    return cart
  } catch (error) {
    console.error('Error al obtener el carrito por ID:', error)
    res.status(500).json({ message: 'Error al obtener el carrito por ID: ' + error })
    
  }
}

export const addToCartController = async (req: AuthenticationRequest, res: Response) => {
  try {
    const productId = +req.params.idproducts

    const currentUser = req.user

    await addToCart({ idusers: currentUser.idusers, idproducts: productId })

    res.json({ message: 'Producto agregado al carrito correctamente' })
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error)
    res.status(500).json({ message: 'Error al agregar el producto al carrito: ' + error })
  }
}

export const purchaseProductController = async (req: AuthenticationRequest, res: Response) => {
  try {
    const cartId = parseInt(req.params.idcart)
    const productId = parseInt(req.body.idproducts, 10)


    
    if (isNaN(cartId) || isNaN(productId)) {
      return res.status(400).json({ error: 'Valores de parámetros no válidos' })
    }

    const currentUser = req.user

    
   const ticket = await PurchaseProduct({idproducts: productId, idcart: cartId, idusers: currentUser.idusers})

   
    res.json({ message: 'Producto comprado correctamente', ticket: ticket})
  } catch (error) {
    console.error('Error al comprar el producto en el carrito:', error)

    
    res.status(500).json({ error: 'Error al comprar el producto en el carrito' })
  }
}