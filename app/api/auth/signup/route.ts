// app/api/auth/signup/route.ts
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
    const { name, email, password } = body

    console.log("📝 Registration attempt:", {
      name,
      email,
      hasPassword: !!password,
    })

    // Validate required fields
    if (!name || !email || !password) {
      console.log("Missing fields:", {
        name: !!name,
        email: !!email,
        password: !!password,
      })
      return new Response(
        JSON.stringify({
          message: "Missing required fields: name, email, or password",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.log("User already exists:", email)
      return new Response(
        JSON.stringify({ message: "User already exists with this email." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Hash the password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    // Save user to database
    const savedUser = await newUser.save()
    console.log("✅ User created successfully:", savedUser._id)

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    })

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        token,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error: any) {
    console.error("Registration error:", error)

    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ message: "User already exists with this email." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    return new Response(
      JSON.stringify({ message: "Server error during registration." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
