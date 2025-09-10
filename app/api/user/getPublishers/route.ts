import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/backend/lib/db"
import User from "@/backend/models/User"

// GET - Fetch all publishers
export async function GET(req: NextRequest) {
  await dbConnect()

  try {
    const users = await User.find(
      { role: "publisher" },
      "firstName secondName bio profileImage"
    )
    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    )
  }
}
