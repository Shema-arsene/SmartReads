import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "@/models/User"
import dbConnect from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET!

export const registerUser = async (req: any, res: any) => {
  await dbConnect()

  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" })

    return res.status(201).json({
      token,
      user: { id: newUser._id, email: newUser.email, name: newUser.name },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error." })
  }
}

export const loginUser = async (req: any, res: any) => {
  await dbConnect()

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })

    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error." })
  }
}
