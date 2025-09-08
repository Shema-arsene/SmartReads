import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/app/context/AuthContext"
import { getInitials } from "@/utils/getInitials"

const ProfileAvatar = () => {
  const { user } = useAuth()
  const userNames = user?.firstName + " " + user?.secondName
  const userInitials = getInitials(userNames ?? "")

  return (
    <>
      <Avatar>
        <AvatarImage src={user.profileImage} />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
    </>
  )
}

export default ProfileAvatar
