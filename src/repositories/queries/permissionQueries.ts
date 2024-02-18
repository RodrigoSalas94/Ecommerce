import permissionModel from "../../models/schemas/permissionModel"

export const findPermissionByName = async (permissionname: string) => {
    const permission = await permissionModel.findOne({
        where: { permissionname }
    })

    if (!permission) {
        throw new Error(`Permiso "${permissionname}" no encontrado`)
    }

    return permission
}