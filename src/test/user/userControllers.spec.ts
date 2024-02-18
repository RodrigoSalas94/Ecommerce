import { getUser, registerUser, loginUser, verifyEmail, updateUser, desactivateUser, reactivateUser } from "../../services/userServices";
import { getUserController, registerUserController, verifyEmailController, loginUserController, updateUserController, desactivateUserController, reactivateUserController } from "../../controllers/userControllers";
import { Request, Response } from "express";
import { AuthenticationRequest } from "../../models/web/request";

jest.mock ('../../services/userServices')
jest.mock ('../../models/web/request')
jest.mock ('express')

describe('test para determinar el correcto funcionamiento de userControllers', () => {
    afterEach(() => {
      jest.clearAllMocks()
    });
  
    test('debería devolver el usuario si se encuentra', async () => {
      const fakeUser = {
        idusers: 1,
        name: 'Usuario de Prueba',
        email: 'usuario@example.com'
      };
  
      
      (getUser as jest.Mock).mockResolvedValueOnce(fakeUser);
  
      
      const req: Partial<AuthenticationRequest> = { params: { idusers: '1' } };
      const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis() 
      };
  
      
      await getUserController(req as AuthenticationRequest, res as Response);
  
      
      expect(getUser).toHaveBeenCalledWith(1);
  
      
      expect(res.json).toHaveBeenCalledWith(fakeUser);
    });
  
    test('debería devolver un mensaje de error si el usuario no se encuentra', async () => {
      
      (getUser as jest.Mock).mockResolvedValueOnce(null);
  
     
      const req: Partial<AuthenticationRequest> = { params: { idusers: '1' } };
      const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
  
     
      await getUserController(req as AuthenticationRequest, res as Response);
  
      
      expect(res.status).toHaveBeenCalledWith(404);
  
      
      expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
    });
  
    test('debería devolver un mensaje de error si hay un error al obtener el usuario', async () => {
      
      (getUser as jest.Mock).mockRejectedValueOnce(new Error('Error al obtener el usuario'));
  
     
      const req: Partial<AuthenticationRequest> = { params: { idusers: '1' } };
      const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis() 
      };
  
      
      await getUserController(req as AuthenticationRequest, res as Response);
  
      
      expect(res.status).toHaveBeenCalledWith(500);
  
      
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener el usuario' });
    });

    test('debería devolver el resultado del registro si los datos son válidos', async () => {
        const fakeUserData = { name: 'Usuario de Prueba', email: 'usuario@example.com', password: 'contraseña' };
        const fakeUserResult = { id: 1, name: fakeUserData.name, email: fakeUserData.email };
    
        
        (registerUser as jest.Mock).mockResolvedValueOnce(fakeUserResult);
    
        
        const req: Partial<Request> = { body: fakeUserData };
        const res: Partial<Response> = {
          json: jest.fn()
        };
    
      
        await registerUserController(req as Request, res as Response);
    
       
        expect(registerUser).toHaveBeenCalledWith(fakeUserData);
    
       
        expect(res.json).toHaveBeenCalledWith(fakeUserResult);
      });
    
    test('debería devolver un mensaje de error si los datos de usuario son inválidos', async () => {
       
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
    
      
        await registerUserController(req as Request, res as Response);
    
        
        expect(res.status).toHaveBeenCalledWith(400);
    
        
        expect(res.json).toHaveBeenCalledWith({ error: 'Datos de usuario inválidos' });
      });
    
    test('debería devolver un mensaje de error si hay un error al registrar el usuario', async () => {
        
        (registerUser as jest.Mock).mockRejectedValueOnce(new Error('Error al registrar el usuario'));
    
       
        const fakeUserData = { name: 'Usuario de Prueba', email: 'usuario@example.com', password: 'contraseña' };
        const req: Partial<Request> = { body: fakeUserData };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(), 
          json: jest.fn()
        };
    
        
        await registerUserController(req as Request, res as Response);
    
      
        expect(res.status).toHaveBeenCalledWith(500);
    
        
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al registrar el usuario' });
      });

    test('debería verificar el correo electrónico correctamente', async () => {
        const verificationToken = 'fakeVerificationToken';
        const userId = 'fakeUserId';
        const message = 'Correo electrónico verificado correctamente';

        (verifyEmail as jest.Mock).mockResolvedValueOnce(message);

        const req: Partial<AuthenticationRequest> = { params: { verificationToken }, userId };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await verifyEmailController(req as AuthenticationRequest, res as Response);

        expect(verifyEmail).toHaveBeenCalledWith(userId, verificationToken);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message });
    });

    test('debería devolver un mensaje de error si hay un error al verificar el correo electrónico', async () => {
        const verificationToken = 'fakeVerificationToken';
        const userId = 'fakeUserId';
        const errorMessage = 'Error al verificar el correo electrónico';

        (verifyEmail as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const req: Partial<AuthenticationRequest> = { params: { verificationToken }, userId };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await verifyEmailController(req as AuthenticationRequest, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería iniciar sesión correctamente', async () => {
        const userData = { email: 'fake@example.com', password: 'fakePassword' };
        const fakeToken = 'fakeToken';

        (loginUser as jest.Mock).mockResolvedValueOnce(fakeToken);

        const req: Partial<Request> = { body: userData };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await loginUserController(req as Request, res as Response);

        expect(loginUser).toHaveBeenCalledWith(userData);
        expect(res.json).toHaveBeenCalledWith(fakeToken);
    });

    test('debería devolver un mensaje de error si los datos de inicio de sesión son inválidos', async () => {
        const invalidData = { email: '', password: '' };
        const errorMessage = 'Datos de inicio de sesión inválidos';

        const req: Partial<Request> = { body: invalidData };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await loginUserController(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería devolver un mensaje de error si hay un error al iniciar sesión', async () => {
        const userData = { email: 'fake@example.com', password: 'fakePassword' };
        const errorMessage = 'Error al iniciar sesión';

        (loginUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const req: Partial<Request> = { body: userData };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await loginUserController(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería actualizar el usuario correctamente', async () => {
        const fakeUpdates = { name: 'New Name', email: 'new@example.com' };
        const fakeUser = { idusers: 1, name: 'Old Name', email: 'old@example.com' };

        const req: Partial<AuthenticationRequest> = { user: fakeUser, body: { updates: fakeUpdates } };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await updateUserController(req as AuthenticationRequest, res as Response);

        expect(updateUser).toHaveBeenCalledWith(fakeUser.idusers, fakeUpdates);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuario actualizado correctamente' });
    });

    test('debería devolver un mensaje de error si los datos de actualización son inválidos', async () => {
        const invalidData = null;
        const errorMessage = 'Datos de actualización de usuario inválidos';
    
        const req: Partial<AuthenticationRequest> = { body: { updates: invalidData } };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    
        await updateUserController(req as AuthenticationRequest, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(400); 
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería devolver un mensaje de error si hay un error al actualizar el usuario', async () => {
        const fakeUpdates = { name: 'New Name', email: 'new@example.com' };
        const fakeUser = { idusers: 1, name: 'Old Name', email: 'old@example.com' };
        const errorMessage = 'Error al actualizar el usuario';

        (updateUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const req: Partial<AuthenticationRequest> = { user: fakeUser, body: { updates: fakeUpdates } };
        const res: Partial<Response> = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await updateUserController(req as AuthenticationRequest, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería desactivar el usuario correctamente', async () => {
        const fakeUser = { idusers: 1 };
        const req: Partial<AuthenticationRequest> = { user: fakeUser };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await desactivateUserController(req as AuthenticationRequest, res as Response);

        expect(desactivateUser).toHaveBeenCalledWith(fakeUser.idusers);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('debería devolver un mensaje de error si hay un error al desactivar el usuario', async () => {
        const fakeUser = { idusers: 1 };
        const errorMessage = 'Error al desactivar el usuario';

        (desactivateUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const req: Partial<AuthenticationRequest> = { user: fakeUser };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await desactivateUserController(req as AuthenticationRequest, res as Response);

        expect(desactivateUser).toHaveBeenCalledWith(fakeUser.idusers);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    test('debería reactivar el usuario correctamente', async () => {
        const fakeUser = { idusers: 1 };
        const req: Partial<AuthenticationRequest> = { user: fakeUser };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await reactivateUserController(req as AuthenticationRequest, res as Response);

        expect(reactivateUser).toHaveBeenCalledWith(fakeUser.idusers);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test('debería devolver un mensaje de error si hay un error al reactivar el usuario', async () => {
        const fakeUser = { idusers: 1 };
        const errorMessage = 'Error al activar el usuario';

        (reactivateUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const req: Partial<AuthenticationRequest> = { user: fakeUser };
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await reactivateUserController(req as AuthenticationRequest, res as Response);

        expect(reactivateUser).toHaveBeenCalledWith(fakeUser.idusers);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });