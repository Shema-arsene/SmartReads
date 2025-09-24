"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
  _id: string
  id: string
  firstName: string
  secondName: string
  email: string
  password: string
  role: string
  profileImage: string
  bio: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (
    firstName: string,
    secondName: string,
    email: string,
    userRole: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Login failed")
    }

    const data = await res.json()
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
  }

  const signup = async (
    firstName: string,
    secondName: string,
    email: string,
    userRole: string,
    password: string
  ) => {
    console.log("🚀 Attempting signup with:", {
      firstName,
      secondName,
      email,
      password,
      userRole,
    })

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        secondName,
        email,
        userRole,
        password,
      }),
    })

    console.log("📡 Response status:", res.status)

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Signup error:", errorData)
      throw new Error(errorData.message || "Signup failed")
    }

    const data = await res.json()
    console.log("✅ Signup successful:", data)

    setUser(data.user)
    setToken(data.token)
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
