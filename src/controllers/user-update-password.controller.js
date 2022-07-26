import { SALT } from "#Constants/salt.js"
import UserModel from "#Schemas/user.schema.js"
import { compare, hash } from "bcrypt"

const userUpdatePasswordController = async (req, res) => {
  const { id, body } = req
  const { oldPassword, newPassword } = body

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const checkPassword = compare(oldPassword, foundUserById.password)

  if (!checkPassword)
    return res.status(409).json({ error: 'Credentiales incorrectas' })

  const hashedPassword = await hash(newPassword, SALT)
  foundUserById.password = hashedPassword

  await foundUserById.save()

  return res.json({ message: 'Password del usuario actualizado' })
}

export default userUpdatePasswordController