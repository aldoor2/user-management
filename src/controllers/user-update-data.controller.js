import UserModel from "#Schemas/user.schema.js"

const userUpdateDataController = async (req, res) => {
  const { id, body } = req
  const { name, surname } = body

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  foundUserById.name = name
  foundUserById.surname = surname

  await foundUserById.save()

  return res.json({ message: 'Los datos del usuario actualizado' })
}

export default userUpdateDataController