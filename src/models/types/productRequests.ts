export type productData = {
    idproducts: number
    name: string
    description: string
    price: number
    quantity: number
    state: 'in_cart' | 'purchased' | 'active' | 'inactive'
}

export type AddProduct = Pick<productData, 'name' | 'description' | 'price'>

export type UpdateProduct = Pick<productData, 'name' | 'description' | 'price'>

export type ProductState = 'in_cart' | 'purchased' | 'active' | 'inactive'