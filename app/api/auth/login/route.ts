// app/api/auth/login/route.ts
import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/backend/lib/db"
import User from "@/backend/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    // Find user (ensure password is included in query)
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    )

    console.log("✅ Login successful for:", email)

    // Return safe user object
    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          secondName: user.secondName,
          email: user.email,
          bio: user.bio,
          profileImage: user.profileImage,
          role: user.role,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Login error:", error)
    return new Response(
      JSON.stringify({ message: "Server error during login." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
