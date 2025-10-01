"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { getInitials } from "@/utils/getInitials"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type UserForm = {
  firstName: string
  secondName: string
  email: string
  password: string
  role: string
  profileImage: string
  bio: string
}

const UpdateProfileForm = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [profileUser, setProfileUser] = useState(null)

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")

      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
        },
      })

      const data = await res.json()
      setProfileUser(data.user)
      if (!res.ok) throw new Error(data.message || "Failed to fetch user")

      setForm({
        firstName: data.user.firstName,
        secondName: data.user.secondName,
        email: data.user.email,
        password: "",
        role: data.user.role,
        profileImage: data.user.profileImage,
        bio: data.user.bio,
      })
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }

    fetchUser()
  }, [user, loading, router])

  useEffect(() => {
    fetchUser()
  }, [])

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
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)

  const userNames = user?.firstName + " " + user?.secondName

  const userBothNames = user?.firstName + " " + user?.secondName
  const userInitials = getInitials(userBothNames ?? "")

  // Handle input changes:
  // 1. For text/textarea inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 2. For Select (We used this separate function because Shadcn returns a value directly, not an event like regular form elements)
  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value })
  }

  // 3. For changing image
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setProfileImageFile(file)
  }

  // 4. Upload image to Cloudinary
  const uploadProfileImageToCloudinary = async (
    imageFile: File
  ): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await res.json()
      return data.secure_url
    } catch (err) {
      console.error("Cloudinary upload failed:", err)
      return null
    }
  }

  // Update profile
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      // Password validation
      if (form.password && form.password !== confirmPassword) {
        alert("Passwords do not match")
        setUpdating(false)
        setConfirmPassword("")
        return
      }

      // Upload image if a new one is selected
      let imageUrl = form.profileImage // fallback to existing
      if (profileImageFile) {
        const uploadedUrl = await uploadProfileImageToCloudinary(
          profileImageFile
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }

      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")

      // Prepare payload with updated profileImage
      const payload = { ...form, profileImage: imageUrl }

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Update failed")
      }

      alert("Profile updated successfully!")
      setConfirmPassword("")
      setProfileImageFile(null)
      fetchUser()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Update failed. Try again.")
    } finally {
      setUpdating(false)
      fetchUser()
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
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-5 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-xl text-center font-semibold">
          Profile Information
        </h1>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 my-8 border-b border-gray-200 pb-3">
          {user?.profileImage ? (
            <Image
              src={user?.profileImage}
              alt={userNames}
              width={100}
              height={100}
              className="rounded-full object-cover border"
            />
          ) : (
            <p>{userInitials}</p>
          )}

          <div>
            <h1 className="text-3xl font-bold whitespace-nowrap">
              {userNames}
            </h1>
            <p className="text-gray-600 my-2">{user?.email}</p>
            <span className="text-sm px-3 py-1 rounded bg-[#a5be00]/20 text-[#679436] font-medium">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </span>
          </div>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-5">
          <div>
            <label className="block font-medium">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
            />
          </div>
          {profileImageFile && (
            <div className="mt-2 mb-4">
              <Image
                src={URL.createObjectURL(profileImageFile)}
                alt="Preview"
                width={100}
                height={100}
                className="object-cover border"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
              />
            </div>
            <div>
              <label className="block font-medium">Second Name:</label>
              <input
                type="text"
                name="secondName"
                value={form.secondName}
                onChange={handleChange}
                placeholder="Enter your second name"
                className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your new e-mail"
              className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
            />
          </div>
          <div>
            <label className="block font-medium">New Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
            />
          </div>
          <div>
            <label className="block font-medium">Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
            />
          </div>
          <div>
            <label className="block font-medium">Bio:</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Update your bio"
              rows={3}
              className="w-full mt-1 border px-4 py-2 rounded-md text-gray-700"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block font-medium">Role:</label>
            <Select value={form.role} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reader">Reader</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="publisher">Publisher</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-[#a5be00] text-white px-6 py-3 rounded-lg hover:bg-[#88a500] transition"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default UpdateProfileForm
