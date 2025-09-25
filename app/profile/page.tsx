"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

type UserForm = {
  firstName: string
  secondName: string
  email: string
  password: string
  role: string
  profileImage: string
  bio: string
}

const ProfilePage = () => {
  const router = useRouter()
  const { user, loading } = useAuth()

  const [updating, setUpdating] = useState(false)
  const [form, setForm] = useState<UserForm>({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    role: "",
    profileImage: "",
    bio: "",
  })

  const userNames = user?.firstName + " " + user?.secondName

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        secondName: user.secondName || "",
        email: user.email || "",
        password: "",
        role: user.role || "reader",
        profileImage: user.profileImage || "",
        bio: user.bio || "",
      })
    }
  }, [user])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Update profile
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      })
      const data = await res.json()
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Update failed. Try again.")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-20 h-20 animate-spin text-gray-500" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">No user found. Please log in.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <Image
            src={
              user.profileImage ||
              "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
            }
            alt={userNames}
            width={100}
            height={100}
            className="rounded-full object-cover border"
          />
          <div>
            <h1 className="text-3xl font-bold">{userNames}</h1>
            <p className="text-gray-600 my-2">{user.email}</p>
            <span className="text-sm px-3 py-1 rounded bg-[#a5be00]/20 text-[#679436] font-medium">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleUpdate} className="space-y-5 mb-12">
          <div>
            <label className="block font-medium">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              value={form.profileImage}
              onChange={handleChange}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full mt-1 border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Second Name</label>
              <input
                type="text"
                name="secondName"
                value={form.secondName}
                onChange={handleChange}
                placeholder="Enter your second name"
                className="w-full mt-1 border px-4 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your new e-mail"
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Update your bio"
              rows={3}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-[#a5be00] text-white px-6 py-3 rounded-lg hover:bg-[#88a500] transition"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Stats / Role-specific Content */}
        <section>
          {user.role === "reader" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Your Reading Stats
              </h2>
              <ul className="space-y-3">
                <li>
                  Total Books Read: <span className="font-bold">42</span>
                </li>
                <li>
                  Currently Reading: <span className="font-bold">3</span>
                </li>
                <li>
                  Wishlist Items: <span className="font-bold">8</span>
                </li>
              </ul>
            </div>
          )}

          {user.role === "author" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Your Author Dashboard
              </h2>
              <ul className="space-y-3">
                <li>
                  Books Published: <span className="font-bold">5</span>
                </li>
                <li>
                  Total Reads: <span className="font-bold">1.2K</span>
                </li>
                <li>
                  Followers: <span className="font-bold">340</span>
                </li>
              </ul>
            </div>
          )}

          {user.role === "publisher" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Publisher Insights
              </h2>
              <ul className="space-y-3">
                <li>
                  Total Authors: <span className="font-bold">12</span>
                </li>
                <li>
                  Total Books Managed: <span className="font-bold">45</span>
                </li>
                <li>
                  Revenue: <span className="font-bold">$8,900</span>
                </li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
