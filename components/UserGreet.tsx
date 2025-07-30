"use client"

import { useAuth } from "@/app/context/AuthContext"

const UserGreet = () => {
  const { user } = useAuth()

  return (
    <div>
      {user ? (
        <h1 className="text-xl md:text-3xl font-medium">
          Welcome to SmartReads{" "}
          <span className="font-bold whitespace-nowrap">{user.name}</span>
        </h1>
      ) : (
        <h1 className="text-xl md:text-3xl font-bold">Meet SmartReads</h1>
      )}
    </div>
  )
}

export default UserGreet
