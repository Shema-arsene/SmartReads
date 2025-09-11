import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "@/backend/models/User"
import dbConnect from "@/backend/lib/db"

const JWT_SECRET = process.env.JWT_SECRET!

export const registerUser = async (body: any) => {
  await dbConnect()

  try {
    const { firstName, secondName, email, password } = body

    // Validate required fields
    if (!firstName || !secondName || !email || !password) {
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
      firstName,
      secondName,
      email,
      password: hashedPassword,
    })

    // Save user to database
    const savedUser = await newUser.save()

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    })

    // In registerUser
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
          bio: savedUser.bio,
          profileImage: savedUser.profileImage,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
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

export const loginUser = async (body: any) => {
  await dbConnect()

  try {
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields: email or password",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Find the user by email
    const user = await User.findOne({ email })

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })

    // In loginUser
    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          secondName: user.secondName,
          role: user.role,
          bio: user.bio,
          profileImage: user.profileImage,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
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
