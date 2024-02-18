import { getCart, PurchaseProduct, addToCart } from "../../services/cartServices";
import { updateProductQuantityQuery, updateProductStateQuery } from "../../repositories/queries/productQueries";
import { addToCartQuery,purchaseProductCartQuery, getCartQuery } from "../../repositories/queries/cartQueries";
import { createTicket, getProductPriceQuery } from "../../repositories/queries/ticketQueries";

jest.mock ('../../repositories/queries/cartQueries')
jest.mock ('../../repositories/queries/productQueries')
jest.mock ('../../repositories/queries/ticketQueries')


describe('Pruebas para testear el funcionamiento de cartServices', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('debería devolver el carrito correctamente si existe', async () => {
      const idcart = 1;
      const fakeCart = { idcart: idcart, items: ['item1', 'item2'] };
  
      (getCartQuery as jest.Mock).mockResolvedValue(fakeCart);
  
      const cart = await getCart(idcart);
  
      expect(cart).toEqual(fakeCart);
      expect(getCartQuery).toHaveBeenCalledWith(idcart);
    });
  
    test('debería lanzar un error si hay un error al obtener el carrito', async () => {
      const idcart = 1;
  
      (getCartQuery as jest.Mock).mockRejectedValue(new Error('Error al obtener el carrito'));
  
      await expect(getCart(idcart)).rejects.toThrow('Error al obtener el producto por ID');
      expect(getCartQuery).toHaveBeenCalledWith(idcart);
    });

    test('debería agregar el producto al carrito correctamente', async () => {
      const productCart = {
        idproducts: 1,
        quantity: 2,
        idusers: 1,
      };
  
      await addToCart(productCart);
  
      expect(addToCartQuery).toHaveBeenCalledWith(productCart);
      
    });
  
    test('debería lanzar un error si hay un problema al agregar el producto al carrito', async () => {
      const productCart = {
        idproducts: 1,
        quantity: 2,
        idusers: 1,
      };
  
      const errorMessage = 'Error al agregar el producto al carrito desde el servicio';
      (addToCartQuery as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
      try {
        await addToCart(productCart);
        fail('Se esperaba una excepción.');
      } catch (error:any) {
        expect(error.message).toBe(errorMessage);
        
      }
    });
  

    test('debe comprar el producto con éxito', async () => {
   
    (updateProductStateQuery as jest.Mock).mockResolvedValueOnce('available');


    (getCartQuery as jest.Mock).mockResolvedValueOnce({ idcart: 1, items: [], total: 0 });


    (purchaseProductCartQuery as jest.Mock).mockResolvedValueOnce({ status: 'success', orderId: '123456' });


    (updateProductQuantityQuery as jest.Mock).mockResolvedValueOnce({ status: 'success' });


    const productPrice = 10; 
    (getProductPriceQuery as jest.Mock).mockResolvedValueOnce(productPrice);


    const ticketData = { idusers: 13, idproducts: 16, total: 10, date: new Date() };
    (createTicket as jest.Mock).mockResolvedValueOnce(ticketData);
  
      const ProductCart = { idproducts: 1, idusers: 1, idcart: 1 };
      const ticket = await PurchaseProduct(ProductCart);
  
      
      expect(updateProductStateQuery).toHaveBeenCalledWith(ProductCart.idproducts, 'purchased');
      expect(updateProductQuantityQuery).toHaveBeenCalledWith(ProductCart.idproducts, -1);
      expect(createTicket).toHaveBeenCalledWith({
        idusers: ProductCart.idusers,
        idproducts: ProductCart.idproducts,
        total: productPrice,
        date: expect.any(Date)
      });
  
     
      expect(ticket).toBeDefined();
    });
  
    test('debería arrojar un error si el producto ya está comprado', async () => {
        
        (updateProductStateQuery as jest.Mock).mockResolvedValueOnce('purchased');
    
        const ProductCart = { idproducts: 12, idusers: 12, idcart: 12 };
    
       
        await expect(PurchaseProduct(ProductCart)).rejects.toThrow('Error al comprar el producto en el carrito');
      });
    
  test('debería lanzar un error si el user o el carro no existen', async () => {
        (getCartQuery as jest.Mock).mockResolvedValueOnce(null);
    
        const ProductCart = { idproducts: 15, idusers: 15, idcart: 15 };
    
        await expect(PurchaseProduct(ProductCart)).rejects.toThrow('Error al comprar el producto en el carrito');
      });
    
  });

 
  
  
    
  
  