import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  _id: { type: String, _id: false },
  name: { type: String, required: true, minlength: 2, maxlength: 20 },
  surname: { type: String, required: true, minlength: 4, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const UserModel = model('User', userSchema)

export default UserModel