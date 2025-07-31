// app/api/auth/signup/route.ts
import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/backend/lib/db"
import User from "@/backend/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  await dbConnect()

  try {
    const body = await request.json()
    const { name, email, userRole, password } = body

    console.log("Incoming body", body)

    console.log("📝 Registration attempt:", {
      name,
      email,
      hasPassword: !!password,
      role: userRole,
    })

    // Validate required fields
    if (!name || !email || !password || !userRole) {
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

    // Create new user
    const newUser = new User({
      name,
      email,
      role: userRole,
      password,
    })

    // Save user to database
    const savedUser = await newUser.save()
    console.log("✅ User created successfully:", savedUser._id)

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    )

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        token,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          role: savedUser.role,
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
