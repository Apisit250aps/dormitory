import mongoose from 'mongoose'
import { User } from 'next-auth'

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.users || mongoose.model('users', UserSchema)
