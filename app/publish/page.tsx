"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import PublishBookForm from "@/components/PublishBookForm"

export default function PublishBookPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || (user.role !== "author" && user.role !== "publisher")) {
        console.log("Redirecting because user role is:", user?.role)
        router.replace("/")
      }
    }
  }, [user, loading])

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-16 h-16 border-4 border-[#c8553dff] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (loading) return <LoadingSpinner />

  if (!user || (user.role !== "author" && user.role !== "publisher")) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Publish New Book
      </h1>
      <PublishBookForm />
    </div>
  )
}
