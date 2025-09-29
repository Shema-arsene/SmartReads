import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import User from "@/backend/models/User"
import jwt from "jsonwebtoken"

// Helper: extract user ID from Authorization header
function getUserIdFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null

  const token = authHeader.split(" ")[1]
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    return decoded.id
  } catch (error) {
    return null
  }
}

// GET - Fetch the currently logged-in user
export async function GET(req: NextRequest) {
  await dbConnect()

  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await User.findById(userId).select(
      "firstName secondName email password role bio profileImage"
    )

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { message: "Failed to fetch user", error: error.message },
      { status: 500 }
    )
  }
}

// PUT - Update the currently logged-in user
export async function PUT(req: NextRequest) {
  await dbConnect()

  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Fetch the user document first
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update fields safely
    user.firstName = body.firstName ?? user.firstName
    user.secondName = body.secondName ?? user.secondName
    user.email = body.email ?? user.email
    user.role = body.role ?? user.role
    user.bio = body.bio ?? user.bio
    user.profileImage = body.profileImage ?? user.profileImage

    // Only update password if provided; pre-save hook will hash it
    if (body.password) {
      user.password = body.password
    }

    // Save document (triggers pre-save hook)
    await user.save()

    // Return safe user fields only
    return NextResponse.json(
      {
        user: {
          firstName: user.firstName,
          secondName: user.secondName,
          email: user.email,
          role: user.role,
          bio: user.bio,
          profileImage: user.profileImage,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { message: "Failed to update user", error: error.message },
      { status: 500 }
    )
  }
}
