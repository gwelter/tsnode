import mongoose, { Document } from 'mongoose'

interface UserInterface extends Document {
  email: string
  firstName: string
  lastName: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const User = mongoose.model<UserInterface>('User', userSchema)
