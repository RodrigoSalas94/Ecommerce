import { Response, Request } from "express";
import { AuthenticationRequest } from "../../models/web/request";
import { addProduct, getProductById, updateProduct, deleteProductService, getAllProductsService } from "../../services/productServices";
import { getProductByIdController, addProductController, updateProductController, deleteProductController, getAllProductsController } from "../../controllers/productControllers";

jest.mock ('express')
jest.mock ('../../models/web/request')
jest.mock ('../../services/productServices')

describe('test para determinar el correcto funcionamiento de productsControllers', () => {
    afterEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('debería añadir un nuevo producto correctamente', async () => {
      const fakeProductData = { name: 'Nuevo Producto', price: 10 };
      const fakeUser = { idusers: 1 };
  
      (addProduct as jest.Mock).mockResolvedValueOnce(fakeProductData);
  
      const req: Partial<AuthenticationRequest> = {
        body: { productData: fakeProductData },
        user: fakeUser,
      };
      const res: Partial<Response> = {
        json: jest.fn(),
      };
  
      await addProductController(req as AuthenticationRequest, res as Response);
  
      expect(addProduct).toHaveBeenCalledWith(fakeProductData, fakeUser.idusers);
      expect(res.json).toHaveBeenCalledWith(fakeProductData);
    });
  
    test('debería devolver un mensaje de error si hay un problema al añadir el producto', async () => {
      const fakeProductData = { name: 'Nuevo Producto', price: 10 };
      const errorMessage = 'Error general al agregar el producto';
  
      (addProduct as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
  
      const req: Partial<AuthenticationRequest> = {
        body: { productData: fakeProductData },
        user: { idusers: 1 },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await addProductController(req as AuthenticationRequest, res as Response);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería devolver el producto si se encuentra', async () => {
        const fakeProductId = 1;
        const fakeProduct = { idproducts: 1, name: 'Producto de prueba', price: 10 };
    
        (getProductById as jest.Mock).mockResolvedValueOnce(fakeProduct);
    
        const req: Partial<Request> = { params: { idproducts: String(fakeProductId) } };
        const res: Partial<Response> = {
          json: jest.fn(),
        };
    
        await getProductByIdController(req as Request, res as Response);
    
        expect(getProductById).toHaveBeenCalledWith(fakeProductId);
        expect(res.json).toHaveBeenCalledWith(fakeProduct);
      });
    
    test('debería devolver un mensaje de error si el producto no se encuentra', async () => {
        const fakeProductId = 1;
        const errorMessage = 'Producto no encontrado';
    
        (getProductById as jest.Mock).mockResolvedValueOnce(null);
    
        const req: Partial<Request> = { params: { idproducts: String(fakeProductId) } };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await getProductByIdController(req as Request, res as Response);
    
        expect(getProductById).toHaveBeenCalledWith(fakeProductId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener el producto por ID' });
      });
    
    test('debería devolver un mensaje de error si hay un problema al obtener el producto', async () => {
        const fakeProductId = 1;
        const errorMessage = 'Error al obtener el producto';
    
        (getProductById as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
        const req: Partial<Request> = { params: { idproducts: String(fakeProductId) } };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await getProductByIdController(req as Request, res as Response);
    
        expect(getProductById).toHaveBeenCalledWith(fakeProductId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener el producto por ID' });
      });

    test('debería actualizar el producto correctamente', async () => {
        const fakeProductId = 1;
        const fakeUpdateData = { name: 'Nuevo Nombre', description: 'Nueva Descripción', price: 20 };
    
        const req: Partial<AuthenticationRequest> = {
          params: { idproducts: String(fakeProductId) },
          body: fakeUpdateData,
        };
        const res: Partial<Response> = {
          json: jest.fn(),
        };
    
        await updateProductController(req as AuthenticationRequest, res as Response);
    
        expect(updateProduct).toHaveBeenCalledWith(fakeProductId, fakeUpdateData);
       
      });
    
    test('debería devolver un mensaje de error si hay un problema al actualizar el producto', async () => {
        const fakeProductId = 1;
        const fakeUpdateData = { name: 'Nuevo Nombre', description: 'Nueva Descripción', price: 20 };
        const errorMessage = 'Error al actualizar el producto';
    
        (updateProduct as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
        const req: Partial<AuthenticationRequest> = {
          params: { idproducts: String(fakeProductId) },
          body: fakeUpdateData,
        };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await updateProductController(req as AuthenticationRequest, res as Response);
    
        expect(updateProduct).toHaveBeenCalledWith(fakeProductId, fakeUpdateData);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar el producto' });
      });

    test('debería eliminar el producto correctamente', async () => {
        const fakeProductId = 1;
    
        const req: Partial<AuthenticationRequest> = {
          params: { idproducts: String(fakeProductId) },
        };
        const res: Partial<Response> = {
          json: jest.fn(),
        };
    
        await deleteProductController(req as AuthenticationRequest, res as Response);
    
        expect(deleteProductService).toHaveBeenCalledWith(fakeProductId);
        expect(res.json).toHaveBeenCalledWith({ message: 'Producto eliminado exitosamente' });
      });
    
    test('debería devolver un mensaje de error si hay un problema al eliminar el producto', async () => {
        const fakeProductId = 1;
        const errorMessage = 'Error al eliminar el producto';
    
        (deleteProductService as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
        const req: Partial<AuthenticationRequest> = {
          params: { idproducts: String(fakeProductId) },
        };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await deleteProductController(req as AuthenticationRequest, res as Response);
    
        expect(deleteProductService).toHaveBeenCalledWith(fakeProductId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar el producto' });
      });

    test('debería devolver todos los productos correctamente', async () => {
        const fakeProducts = [
          { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
          { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
        ];
    
        (getAllProductsService as jest.Mock).mockResolvedValueOnce(fakeProducts);
    
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          json: jest.fn(),
        };
    
        await getAllProductsController(req as Request, res as Response);
    
        expect(getAllProductsService).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(fakeProducts);
      });
    
    test('debería devolver un mensaje de error si no se encuentran productos', async () => {
        const errorMessage = 'No se encontraron productos';
    
        (getAllProductsService as jest.Mock).mockResolvedValueOnce([]);
    
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await getAllProductsController(req as Request, res as Response);
    
        expect(getAllProductsService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    
    test('debería devolver un mensaje de error si hay un problema al obtener los productos', async () => {
        const errorMessage = 'Error al obtener los productos';
    
        (getAllProductsService as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await getAllProductsController(req as Request, res as Response);
    
        expect(getAllProductsService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
  });