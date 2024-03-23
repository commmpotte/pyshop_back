import mongoose, { Document } from 'mongoose'
import { UserSchema } from '../schemas/user.schema'

export interface User extends Document {
  email: string
  password: string
  name?: string
  phone?: string
  address?: string
  about?: string
}

export const UserModel = mongoose.model<User>('User', UserSchema)
