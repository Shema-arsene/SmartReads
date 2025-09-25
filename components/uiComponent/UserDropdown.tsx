import React from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ProfileAvatar from "./ProfileAvatar"
import Link from "next/link"
import LogoutButton from "@/components/uiComponent/LogoutButton"

const UserDropdown = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="mr-1.5">
            <ProfileAvatar />
          </div>
        </MenubarTrigger>
        <MenubarSeparator />
        <MenubarContent>
          <MenubarItem>
            <Link href="/profile" className="w-full">
              Profile
            </Link>
          </MenubarItem>
          <MenubarItem>
            <LogoutButton />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default UserDropdown
