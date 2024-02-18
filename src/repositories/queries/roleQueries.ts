import RoleModel from "../../models/schemas/roleModel"



export const findRoleByName = async (name: string, includePermission: boolean = false) => {
  const attributes = includePermission ? ['rolename', 'permissionname'] : ['rolename']

  const role = await RoleModel.findOne({
    where: { rolename: name },
    attributes: attributes,
  })

  if (!role) {
    throw new Error(`El rol "${name}" no se encontró en la base de datos.`);
  }

  return role;
}


  