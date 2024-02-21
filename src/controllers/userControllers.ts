import { Response,Request } from "express"
import { getUser, registerUser, loginUser, updateUser, desactivateUser, reactivateUser, verifyEmail } from "../services/userServices"
import { AuthenticationRequest } from "../models/web/request"

export const getUserController = async (req: AuthenticationRequest, res: Response) => {
  try {
      const idusers = req.params.idusers
      const userData = await getUser(+idusers)
      
      if (!userData) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.json(userData)
  } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}


export const registerUserController = async (req: Request, res: Response) => {
    const userData = req.body
  
    if (!userData) {
      return res.status(400).json({ error: 'Datos de usuario inválidos' })
    }
  
    try {
      const result = await registerUser(userData)
      res.json(result)
    } catch (error) {
      res.status(500).json({ error: `Error al registrar el usuario` })
    }
  }
  export const verifyEmailController = async (req: AuthenticationRequest, res: Response) => {
    try {
        const { verificationToken } = req.params

        
        const userId = req.userId

       
        const message = await verifyEmail(userId, verificationToken)

        res.status(200).json({ message })
    } catch (error) {
        
        res.status(500).json({ error: 'Error al verificar el correo electrónico' })
    }
}
  export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Datos de inicio de sesión inválidos' })
    }
  
    try {
      const result = await loginUser({email, password})
      res.json(result)
    } catch (error) {
      res.status(401).json({ error: `Error al iniciar sesión` })
    }
  }
  export const updateUserController = async (req: AuthenticationRequest, res: Response) => {
    const { updates } = req.body

    if (!updates) {
        return res.status(400).json({ error: 'Datos de actualización de usuario inválidos' })
    }

    try {
        const idusers = req.user.idusers
        console.log('ID de usuario:', idusers)

        await updateUser(idusers, updates)

        res.json({ message: 'Usuario actualizado correctamente' })
    } catch (error) {
        
        return res.status(500).json({ error: 'Error al actualizar el usuario' })
    }
};

  
export const desactivateUserController = async (req: AuthenticationRequest, res: Response) => {
  try {
    const idusers = req.user.idusers
    await desactivateUser(idusers)

    res.json({ message: 'Usuario desactivado correctamente' })
    
  } catch (error) {
    res.status(500).json({ error: `Error al desactivar el usuario` })
  }
}

export const reactivateUserController = async (req: AuthenticationRequest, res: Response) => {
  try {
    const idusers = req.user.idusers
    await reactivateUser(idusers)
    res.json({ message: 'Usuario reactivado correctamente' })
  } catch (error) {
    res.status(500).json({ error: `Error al activar el usuario` })
  }
}
