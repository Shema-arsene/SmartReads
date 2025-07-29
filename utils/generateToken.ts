import jwt from "jsonwebtoken"

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  })
}
