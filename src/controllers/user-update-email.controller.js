import UserModel from "#Schemas/user.schema.js"
import { compare } from "bcrypt"

const userUpdateEmailController = async (req, res) => {
  const { id, body } = req
  const { email, password } = body

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const checkPassword = await compare(password, foundUserById.password)

  if (!checkPassword)
    return res.status(409).json({ error: 'Credenciales incorrectas' })

  foundUserById.email = email

  await foundUserById.save()

  return res.json({ message: 'Email del usuario actualizado' })
}

export default userUpdateEmailController