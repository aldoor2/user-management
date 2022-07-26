import UserModel from "#Schemas/user.schema.js"
import { compare } from "bcrypt"

const userUnregisterController = async (req, res) => {
  const { id, body } = req
  const { password } = body

  const foundUserById = await UserModel.findByIdAndDelete(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const checkPassword = compare(password, foundUserById.password)
  if (!checkPassword)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  await foundUserById.delete()

  return res.json({ message: "Los datos del usuario han sido eliminados" })
}

export default userUnregisterController