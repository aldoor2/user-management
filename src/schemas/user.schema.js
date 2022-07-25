import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  surname: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const userModel = model('User', userSchema)

export default userModel