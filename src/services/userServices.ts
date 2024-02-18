import { findUserById, registerUserQuery, findUserByEmail, updateUserQuery, desactivateUserQuery, reactivateUserQuery, updateUserStateQuery } from "../repositories/queries/userQueries"
import { generateToken, generateVerificationToken, verifyToken } from "../utils/jwtUtils"
import { hashPassword, comparePassword } from "../utils/encryptionUtils"
import { UserRegister, UserUpdates, UserLogin } from "../models/types/userRequests"
import { clientRedis } from "../connections/redis/redis"
import { sendVerificationEmail } from "../utils/mailUtils"



export const getUser = async (idusers: number) => {
  try {
      const user = await findUserById(idusers);
      return {
          idusers: user.idusers,
          name: user.name,
          email: user.email,
      };
  } catch (error)  {
      
      throw new Error('Error al obtener el usuario por Token')
  }
};
export const registerUser = async (userData:UserRegister) => {
    try {
      const hashedPassword = await hashPassword(userData.password)
      
      const newUser = await registerUserQuery({
        
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        
        
      })
      
      const token = generateToken(newUser.idusers)
      const verificationToken = generateVerificationToken(newUser.idusers)
      await sendVerificationEmail(userData.email, verificationToken)
  
      return { user: newUser, token }
    } catch (error) {
      throw new Error(`Error al registrar el usuario`)
    }
  }
  export const verifyEmail = async (idusers: number, token: string) => {
    const user = await findUserById(idusers)
    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    const decodedToken = verifyToken(token)
    if (!decodedToken || decodedToken.idusers !== idusers) {
        throw new Error('Token de verificación no válido')
    }

    try {
        await updateUserStateQuery({idusers, verified: true})
        return 'Correo electrónico verificado correctamente'
    } catch (error) {
        
        throw new Error('Error al verificar el correo electrónico')
    }
}

export const loginUser = async (userData:UserLogin) => {
    try {
      const user = await findUserByEmail(userData.email)
      console.log('Usuario encontrado:', user)
  
      const passwordMatch = await comparePassword(userData.password, user.password)
      console.log('Coincidencia de contraseña:', passwordMatch)
  
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta')
      }
      const token = generateToken(user.idusers)
      console.log('Token generado:', token)
  
      const userWithoutPassword = {
        ...user.dataValues,
        email: user.email,
        password: null,
      }
      
      const userCache = {
        email: user.email,
        password: user.password,
      
         }
      
      await clientRedis.setEx(token , 3600, JSON.stringify(userCache))
      console.log(`Información del usuario almacenada en caché con clave: user:${token}`)
     

    
      return { user: userWithoutPassword, token }
    } catch (error) {
      
      throw new Error('Error al iniciar sesión. Detalles en el registro.')
    }
  }
  
export const updateUser = async (idusers: number, updates: UserUpdates ) => {
    try {
        const user = await updateUserQuery(idusers, updates)
       
    } catch (error) {
        throw new Error ('Error al actualizar el usuario')
    }
}
export const desactivateUser = async (idusers: number) => {
  try {
      await desactivateUserQuery(idusers);
      
  } catch (error) {
      throw new Error('Error al desactivar el usuario')
  }
}

export const reactivateUser = async (idusers: number) => {
  try {
      await reactivateUserQuery(idusers)
      
  } catch (error) {
      throw new Error('Error al activar el usuario')
  }
}