"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"

const SignInPage = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSigningIn, setIsSigningIn] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSigningIn(true)

    if (!email || !password) {
      setError("All fields are required")
      setIsSigningIn(false)
      return
    }

    try {
      await login(email, password)
      router.push("/")
      setIsSigningIn(false)
    } catch (err) {
      setError("Invalid email or password.")
      console.log("Login failed. Error: ", err)
      setIsSigningIn(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-darkCyan">
          Sign In
        </h1>

        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 
                      focus:ring-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 
                      focus:ring-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-lg 
                    cursor-pointer duration-300"
        >
          {isSigningIn ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignInPage
