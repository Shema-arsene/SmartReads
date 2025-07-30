import mongoose, { Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema)
