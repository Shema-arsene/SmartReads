import bcrypt from "bcryptjs"

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePasswords(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash)
}
