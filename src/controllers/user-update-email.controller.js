import UserModel from "#Schemas/user.schema.js"
import { compare } from "bcrypt"

const userUpdateEmailController = async (req, res) => {
  const { id, body } = req
  const { email, password } = body

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).send('Usuario no autorizado')

  const checkPassword = await compare(password, foundUserById.password)

  if (!checkPassword)
    return res.status(401).send('Credenciales incorrectas')

  foundUserById.email = email

  await foundUserById.save()

  return res.send('Email del usuario actualizado')
}

export default userUpdateEmailController