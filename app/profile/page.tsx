"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpdateProfileForm from "@/components/UpdateProfileForm"
import ProfileStats from "@/components/ProfileStats"

const ProfilePage = () => {
  return (
    <section className="mt-10">
      {/* Tabs Layout */}
      <Tabs defaultValue="stats">
        {/* Tabs */}
        <TabsList className="flex p-1 w-fit mx-auto">
          <TabsTrigger value="stats" className="cursor-pointer">
            Profile Stats
          </TabsTrigger>
          <TabsTrigger value="submit" className="cursor-pointer">
            Update Profile
          </TabsTrigger>
        </TabsList>

        {/* Content */}
        <div className="flex-1">
          <TabsContent value="stats">
            <ProfileStats />
          </TabsContent>

          <TabsContent value="submit">
            <UpdateProfileForm />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
export default ProfilePage
