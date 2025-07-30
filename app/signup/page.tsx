"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

const SignUpPage = () => {
  const { signup } = useAuth()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !userRole) {
      setError("All fields are required!")
      return
    }

    console.log({ name, email, userRole, password, confirmPassword })

    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    try {
      await signup(name, email, userRole, password)

      router.push("/")
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      console.log("Error: ", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />

          {/* User Type Radio Buttons */}
          <div>
            <h1 className="text-md font-semibold text-gray-900 mb-3">
              Join SmartReads as a:
            </h1>
            <div className="flex justify-between gap-2">
              {["reader", "author", "publisher"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer w-full text-sm font-medium text-gray-700 border-gray-300"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={userRole === type}
                    onChange={() => setUserRole(type)}
                    className="accent-gray-700"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold cursor-pointer duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-900">
          Already have an account?{" "}
          <a href="/signin" className="font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
