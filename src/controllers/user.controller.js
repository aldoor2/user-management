import { SALT } from "#Constants/salt.js"
import UserModel from "#Schemas/user.schema.js"
import { compare, hash } from "bcrypt"

export const userProfileController = async (req, res) => {
  const { id } = req

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const { _id, name, surname, email } = foundUserById

  return res.json({ _id, name, surname, email })
}

export const userUnregisterController = async (req, res) => {
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

export const userUpdateDataController = async (req, res) => {
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

export const userUpdateEmailController = async (req, res) => {
  const { id } = req
  const { email, password } = req.body

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

export const userUpdatePasswordController = async (req, res) => {
  const { id, body } = req
  const { oldPassword, newPassword } = body

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const checkPassword = await compare(oldPassword, foundUserById.password)

  if (!checkPassword)
    return res.status(401).json({ error: 'Credentiales incorrectas' })

  const hashedPassword = await hash(newPassword, SALT)
  foundUserById.password = hashedPassword

  await foundUserById.save()

  return res.json({ message: 'Contraseña del usuario actualizada' })
}