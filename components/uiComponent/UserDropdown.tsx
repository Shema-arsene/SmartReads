import React from "react"
import {
  Menubar,
  // MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  MenubarSeparator,
  // MenubarShortcut,
  // MenubarSub,
  // MenubarSubContent,
  // MenubarSubTrigger,
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
