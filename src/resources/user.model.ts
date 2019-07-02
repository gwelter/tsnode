import mongoose, { Document } from 'mongoose'

interface UserInterface extends Document {
  firstName: string
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const User = mongoose.model<UserInterface>('User', userSchema)
