import ticketModel from "../../models/schemas/ticketschema"
import { Tickets } from "../../models/ticket"
import ProductModel from "../../models/schemas/productModel"

export const createTicket = async (TicketData: Tickets): Promise <Tickets> => {
    try {
        const newTicket = ticketModel.create(TicketData)
        return newTicket
    } catch {
        throw new Error ('Error al crear el ticket')
    }
}

export const getProductPriceQuery = async (idproducts: number): Promise <number> => {
    try {
        const product = await ProductModel.findByPk (idproducts)
        if(!product){
            throw new Error ('El producto no existe')
        }
        return product.price
    } catch{
        throw new Error ('Error obteniendo el precio del producto')
    }
}