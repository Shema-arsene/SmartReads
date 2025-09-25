import React, { useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getInitials } from "@/utils/getInitials"
import { Loader2 } from "lucide-react"

const ProfileStats = () => {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  const userNames = user?.firstName + " " + user?.secondName

  const userBothNames = user?.firstName + " " + user?.secondName
  const userInitials = getInitials(userBothNames ?? "")

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
      <div className="max-w-5xl mx-auto bg-white p-5 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-xl text-center font-semibold">Profile Stats</h1>
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
      </div>
    </main>
  )
}

export default ProfileStats
