import { findRoleByName  } from "../repositories/queries/roleQueries"
import { getWritePermission, getReadPermission } from "./permissionsServices"



export const adminRole = async () => {
  try {
      const writePermission = await getWritePermission()
      const adminRoleData = {
          rolename: 'admin',
          permissions: writePermission
      }
      return findRoleByName(adminRoleData.rolename)
  } catch (error) {
      console.error("Error al definir el rol de administrador:", error)
      throw error
  }
}


export const userRole = async () => {
  try {
      const readPermission = await getReadPermission()
      const userRoleData = {
          rolename: 'user',
          permissions: readPermission
      }
      return findRoleByName(userRoleData.rolename)
  } catch (error) {
      console.error("Error al definir el rol de usuario:", error)
      throw error
  }
}