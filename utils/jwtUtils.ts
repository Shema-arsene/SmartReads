import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret"

export const getTokenFromHeader = (headers: Headers) => {
  const authHeader = headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) return null
  return authHeader.split(" ")[1]
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}
