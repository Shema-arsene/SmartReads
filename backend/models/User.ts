import bcrypt from "bcryptjs"
import mongoose, { Document } from "mongoose"

export interface IUser extends Document {
  firstName: string
  secondName: string
  email: string
  password: string
  role: string
  profileImage: string
  bio: string
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["reader", "author", "publisher"],
    default: "reader",
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema)
