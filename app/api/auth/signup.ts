import { registerUser } from "@/app/api/authController"

export default async function handler(req, res) {
  if (req.method === "POST") {
    return registerUser(req, res)
  }

  res.setHeader("Allow", ["POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
