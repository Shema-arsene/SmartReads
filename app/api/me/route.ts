import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db"
import User from "@/models/User"

export async function GET(req: NextRequest) {
  await connectDB()

  const authHeader = req.headers.get("authorization")
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "No token" }, { status: 401 })
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) throw new Error()

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
