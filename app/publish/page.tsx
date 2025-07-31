"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthContext"
import PublishBookForm from "@/components/PublishBookForm"

export default function PublishBookPage() {
  const { user } = useAuth()
  //   const router = useRouter()

  user && console.log("userRole: ", user.role)

  useEffect(() => {
    if (!user || (user.role !== "author" && user.role !== "publisher")) {
      //   router.replace("/")
      user && console.log("userRole: ", user.role)
    }
  }, [user])

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
