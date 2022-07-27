import { SALT } from "#Constants/salt.js"
import UserModel from "#Schemas/user.schema.js"
import { compare, hash } from "bcrypt"
import { SignJWT } from 'jose'

export const userRegisterController = async (req, res) => {
  const { _id, name, surname, email, password } = req.body

  const existingUserById = await UserModel.findById(_id).exec()
  if (existingUserById) return res.status(409).json({ error: 'Ya existe un usuario con ese id registrado' })

  const existingUserByEmail = await UserModel.findOne({ email }).exec()
  if (existingUserByEmail) return res.status(409).json({ error: 'Ya existe un usuario con ese email registrado' })

  const hashedPassword = await hash(password, SALT)
  const newUser = new UserModel({
    _id, name, surname, email, password: hashedPassword
  })

  await newUser.save()

  res.status(201).json({ message: 'Usuario registrado con exito' })
}

export const userLoginController = async (req, res) => {
  const { email, password } = req.body

  const existingUserByEmail = await UserModel.findOne({ email }).exec()
  if (!existingUserByEmail)
    return res.status(409).json({ error: 'Credenciales incorrectas' })

  const checkPassword = await compare(password, existingUserByEmail.password)

  if (!checkPassword)
    return res.status(409).json({ error: 'Credenciales incorrectas' })

  const jwtConstructor = new SignJWT({ id: existingUserByEmail._id })

  const encoder = new TextEncoder()
  const jwt = await jwtConstructor
    .setProtectedHeader({
      alg: 'HS256', typ: 'JWT'
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))

  return res.json({ token: jwt })
}
