export type Product = {
    idproducts?: number
    name: string
    description: string
    price: number
    quantity?: number
    state?: 'in_cart' | 'purchased' | 'active' | 'inactive'
    idusers?: number
}