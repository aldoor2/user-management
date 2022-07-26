import UserModel from "#Schemas/user.schema.js"

const userProfileController = async (req, res) => {
  const { id } = req

  const foundUserById = await UserModel.findById(id).exec()
  if (!foundUserById)
    return res.status(401).json({ error: 'Usuario no autorizado' })

  const { _id, name, surname, email } = foundUserById

  return res.json({ _id, name, surname, email })
}

export default userProfileController