import { findPermissionByName } from "../repositories/queries/permissionQueries"

export const getReadPermission = async () => {
    try {
        const readPermission = await findPermissionByName('lectura')
    return readPermission
    } catch (error) {
        console.error("Error al obtener el permiso:", error)
        
    }
}

export const getWritePermission = async () => {
    try {
        const writePermission = await findPermissionByName('escritura')
        return writePermission 
    } catch (error) {
        console.error("Error al obtener el permiso:", error)
        
    }
}