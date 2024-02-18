export type ProductCart = {
idusers: number,
idproducts: number,
idcart: number
}

export type AddProduct = Pick <ProductCart, 'idusers' | 'idproducts'>

export type PurchaseProduct = Pick <ProductCart, 'idcart' | 'idproducts'>