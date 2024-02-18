import UserModel from "../../models/schemas/userModel";
import { hashPassword } from "../../utils/encryptionUtils";
import { UserRegister, UserUpdates, UpdateState } from "../../models/types/userRequests";

export const findUserById = async (idusers: number) => {
    const user = await UserModel.findByPk(idusers)
  
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
  
    return user
  }

export const registerUserQuery = async (UserData: UserRegister) => {
    try {
        
        const newUser = await UserModel.create({
           
            name: UserData.name,
            email: UserData.email,
            password: UserData.password,
            
        })
        return newUser
    } catch (error) {
        console.log(error) 
        throw error
    }
}
export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ where: { email }})
    if (!user) {
        throw new Error('Usuario no encontrado')
    }
    
    return user 
}


export const updateUserQuery = async (idusers: number, updates: UserUpdates) => {
    const user = await UserModel.findByPk (idusers)

    if(!user){
        throw new Error ('Usuario no encontrado')
    } else {
          user.name = updates.name || user.name
          user.email = updates.email || user.email
          user.password = updates.password ? await hashPassword(updates.password) : user.password

          await user.save()
          
    }

}

export const updateUserStateQuery = async (UserData: UpdateState) => {
    try {
        const user = await UserModel.findByPk(UserData.idusers)

        if (!user) {
            throw new Error('Usuario no encontrado')
        }

        user.verified = UserData.verified
        await user.save()
    } catch (error) {
        console.error('Error al actualizar el estado de verificación del usuario:', error)
        throw new Error('Error al actualizar el estado de verificación del usuario')
    }
}

export const desactivateUserQuery = async (userId: number) => {
    const user = await UserModel.findByPk(userId)

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    user.active = false
    await user.save()

    
}

export const reactivateUserQuery = async (userId: number) => {
    const user = await UserModel.findByPk(userId)

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    user.active = true
    await user.save()

    
}