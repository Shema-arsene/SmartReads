"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpdateProfileForm from "@/components/UpdateProfileForm"
import ProfileStats from "@/components/ProfileStats"

const ProfilePage = () => {
  return (
    <section className="mt-10">
      {/* Tabs Layout */}
      <Tabs defaultValue="stats" className="w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <TabsList className="flex md:flex-col md:w-48 shrink-0 mx-2 h-fit">
            <TabsTrigger value="stats" className="w-full">
              Profile Stats
            </TabsTrigger>
            <TabsTrigger value="submit" className="w-full">
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
        </div>
      </Tabs>
    </section>
  )
}
export default ProfilePage
