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
    const { firstName, secondName, email, userRole, password, profileImage } =
      body

    console.log("Incoming body", body)

    console.log("📝 Registration attempt:", {
      firstName,
      secondName,
      email,
      hasPassword: !!password,
      role: userRole,
      profileImage,
    })

    // Validate required fields
    if (!firstName || !secondName || !email || !password || !userRole) {
      console.log("Missing fields:", {
        firstName: !!firstName,
        secondName: !!secondName,
        email: !!email,
        password: !!password,
      })
      return new Response(
        JSON.stringify({
          message:
            "Missing required fields: firstName, secondName, email, or password",
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
      firstName,
      secondName,
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
          firstName: savedUser.firstName,
          secondName: savedUser.secondName,
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
