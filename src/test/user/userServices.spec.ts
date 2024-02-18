import { getUser, registerUser, verifyEmail, loginUser, updateUser, desactivateUser, reactivateUser } from '../../services/userServices'
import { findUserById, registerUserQuery, updateUserStateQuery, findUserByEmail, updateUserQuery, desactivateUserQuery, reactivateUserQuery } from '../../repositories/queries/userQueries'
import { hashPassword, comparePassword } from '../../utils/encryptionUtils'
import { generateToken, generateVerificationToken, verifyToken } from '../../utils/jwtUtils'
import { sendVerificationEmail } from '../../utils/mailUtils'
import { clientRedis } from '../../connections/redis/redis'



jest.mock('../../repositories/queries/userQueries')
jest.mock('../../utils/encryptionUtils');
jest.mock('../../utils/jwtUtils');
jest.mock('../../utils/mailUtils');
jest.mock('../../connections/redis/redis');


describe('test para determinar el funcionamiento de userServices', () => {
  test('debería devolver el usuario correcto', async () => {
    
    const testUser = { 
      idusers: 1, 
      name: 'Usuario de Prueba', 
      email: 'usuario@example.com' 
    };
    (findUserById as jest.Mock).mockResolvedValue(testUser)

   
    const userId = 1;
    const user = await getUser(userId)

    
    expect(user).toEqual({
      idusers: testUser.idusers,
      name: testUser.name,
      email: testUser.email,
    })
  })

  test ('debería lanzar un error si findUserById falla', async () => {
   
    (findUserById as jest.Mock).mockRejectedValue(new Error('Error de prueba'))

    const userId = 1
    
    await expect(getUser(userId)).rejects.toThrow('Error al obtener el usuario por Token')
  })

  
  test('debe registrar un usuario y devolver sus datos y un token', async () => {
    const userData = {
      name: 'nombredeprueba',
      email: 'correo@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashedPassword';
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

    const newUser = { idusers: 1 };
    (registerUserQuery as jest.Mock).mockResolvedValue(newUser);

    const token = 'token';
    const verificationToken = 'verificationToken';
    (generateToken as jest.Mock).mockReturnValue(token);
    (generateVerificationToken as jest.Mock).mockReturnValue(verificationToken);

    await registerUser(userData);

    expect(hashPassword).toHaveBeenCalledWith(userData.password);
    expect(registerUserQuery).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    expect(generateToken).toHaveBeenCalledWith(newUser.idusers);
    expect(generateVerificationToken).toHaveBeenCalledWith(newUser.idusers);
    expect(sendVerificationEmail).toHaveBeenCalledWith(userData.email, verificationToken);
  });

  test('debe emitir un error si falla el registro', async () => {
    const userData = {
      name: 'nombredeprueba',
      email: 'correo@example.com',
      password: 'password123',
    };

    (hashPassword as jest.Mock).mockRejectedValue(new Error('falló el password'));

    await expect(registerUser(userData)).rejects.toThrow('Error al registrar el usuario');
  });



  test('debe verificar el correo electrónico correctamente', async () => {
    const idusers = 1;
    const token = 'validToken';

    (findUserById as jest.Mock).mockResolvedValue({ idusers });
    (verifyToken as jest.Mock).mockReturnValue({ idusers });
    (updateUserStateQuery as jest.Mock).mockResolvedValue('Correo electrónico verificado correctamente');

    const result = await verifyEmail(idusers, token);

    expect(result).toBe('Correo electrónico verificado correctamente');
    expect(findUserById).toHaveBeenCalledWith(idusers);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(updateUserStateQuery).toHaveBeenCalledWith({ idusers, verified: true });
  });

  test('debe emitir un error si no se encuentra el usuario', async () => {
    const idusers = 1;
    const token = 'validToken';

    (findUserById as jest.Mock).mockResolvedValue(null);

    await expect(verifyEmail(idusers, token)).rejects.toThrow('Usuario no encontrado');
  });

  test('debe emitir un error si el token no es válido', async () => {
    const idusers = 1;
    const token = 'invalidToken';

    (findUserById as jest.Mock).mockResolvedValue({ idusers });
    (verifyToken as jest.Mock).mockReturnValue(null);

    await expect(verifyEmail(idusers, token)).rejects.toThrow('Token de verificación no válido');
  });

  test('debe emitir un error si falla la actualización del estado del usuario', async () => {
    const idusers = 1;
    const token = 'validToken';

    (findUserById as jest.Mock).mockResolvedValue({ idusers });
    (verifyToken as jest.Mock).mockReturnValue({ idusers });
    (updateUserStateQuery as jest.Mock).mockRejectedValue(new Error());

    await expect(verifyEmail(idusers, token)).rejects.toThrow('Error al verificar el correo electrónico');
  });



  test('debe iniciar sesión correctamente', async () => {
    const userData = {
      email: 'usuario@ejemplo.com',
      password: 'contraseña',
    };

    const hashedPassword = 'contraseña_encriptada';
    (findUserByEmail as jest.Mock).mockResolvedValue({ idusers: 1, email: userData.email, password: hashedPassword });
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('token_generado');
    (clientRedis.setEx as jest.Mock).mockResolvedValue(undefined);

    const result = await loginUser(userData);

    expect(findUserByEmail).toHaveBeenCalledWith(userData.email);
    expect(comparePassword).toHaveBeenCalledWith(userData.password, hashedPassword);
    expect(generateToken).toHaveBeenCalledWith(1);
    expect(clientRedis.setEx).toHaveBeenCalledWith('token_generado', 3600, JSON.stringify({ email: userData.email, password: hashedPassword }));

    expect(result).toEqual({ user: { email: userData.email, password: null }, token: 'token_generado' });
  });

  test('debe lanzar un error si la contraseña es incorrecta', async () => {
    const userData= { email: 'usuario@ejemplo.com', password: 'contraseña' };
  
    (findUserByEmail as jest.Mock).mockResolvedValue({ email: userData.email, password: 'contraseña_encriptada' });
    (comparePassword as jest.Mock).mockResolvedValue(false);
  
    try {
      await loginUser(userData);
      
      fail('Se esperaba una excepción.');
    } catch (error: any) {
      
      expect(error.message).toBe('Error al iniciar sesión. Detalles en el registro.');
    }
  
    expect(findUserByEmail).toHaveBeenCalledWith(userData.email);
    expect(comparePassword).toHaveBeenCalledWith(userData.password, 'contraseña_encriptada');
  })




  test('debería actualizar el usuario correctamente', async () => {
    const idusers = 1;
    const updates = {
      name: 'Nuevo Nombre',
      age: 30,
      email: 'nuevo@ejemplo.com',
      password: 'nuevaContraseña',
    };

    (updateUserQuery as jest.Mock).mockResolvedValue(true);

    await expect(updateUser(idusers, updates)).resolves.not.toThrow();

    expect(updateUserQuery).toHaveBeenCalledWith(idusers, updates);
  });

  test('debería lanzar un error si hay un error al actualizar el usuario', async () => {
    const idusers = 1;
    const updates = {
      name: 'Nuevo Nombre',
      age: 30,
      email: 'nuevo@ejemplo.com',
      password: 'nuevaContraseña',
    };

    (updateUserQuery as jest.Mock).mockRejectedValue(new Error('Error al actualizar el usuario'));

    await expect(updateUser(idusers, updates)).rejects.toThrow('Error al actualizar el usuario');

    expect(updateUserQuery).toHaveBeenCalledWith(idusers, updates);
  });




  test('debería desactivar el usuario correctamente', async () => {
    const idusers = 1;

    (desactivateUserQuery as jest.Mock).mockResolvedValue(true);

    await expect(desactivateUser(idusers)).resolves.not.toThrow();

    expect(desactivateUserQuery).toHaveBeenCalledWith(idusers);
  });

  test('debería lanzar un error si hay un error al desactivar el usuario', async () => {
    const idusers = 1;

    (desactivateUserQuery as jest.Mock).mockRejectedValue(new Error('Error al desactivar el usuario'));

    await expect(desactivateUser(idusers)).rejects.toThrow('Error al desactivar el usuario');

    expect(desactivateUserQuery).toHaveBeenCalledWith(idusers);
  });

  test('debería reactivar el usuario correctamente', async () => {
    const idusers = 1;

    (reactivateUserQuery as jest.Mock).mockResolvedValue(true);

    await expect(reactivateUser(idusers)).resolves.not.toThrow();

    expect(reactivateUserQuery).toHaveBeenCalledWith(idusers);
  });

  test('debería lanzar un error si hay un error al reactivar el usuario', async () => {
    const idusers = 1;

    (reactivateUserQuery as jest.Mock).mockRejectedValue(new Error('Error al activar el usuario'));

    await expect(reactivateUser(idusers)).rejects.toThrow('Error al activar el usuario');

    expect(reactivateUserQuery).toHaveBeenCalledWith(idusers);
  });

})


