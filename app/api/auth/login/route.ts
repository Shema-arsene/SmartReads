import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/backend/lib/db"
import User from "@/backend/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    const body = await request.json()
    const { email, password } = body

    console.log("🔐 Login attempt:", { email })

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      console.log("User not found:", email)
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("Invalid password for:", email)
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    })

    console.log("Login successful:", user._id)

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error: any) {
    console.error("Login error:", error)

    return new Response(
      JSON.stringify({ message: "Server error during login." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
