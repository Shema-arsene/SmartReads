import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET as string

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.redirect(new URL("/login", req.url))

  try {
    verifyToken(token)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
