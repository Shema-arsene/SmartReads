"use client"

import { useAuth } from "./context/AuthContext"
import AuthorPublisherHomepage from "@/components/AuthorPublisherHomepage"
import ReaderHomepage from "@/components/ReaderHomepage"
import DefaultHomepage from "@/components/DefaultHomepage"

export default function Home() {
  const { user } = useAuth()

  if (user?.role === "author" || user?.role === "publisher") {
    return <AuthorPublisherHomepage />
  }

  if (user?.role === "reader") {
    return <ReaderHomepage />
  }

  if (!user) {
    return <DefaultHomepage />
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-[#c2a756] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
