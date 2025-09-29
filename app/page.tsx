"use client"

import { useAuth } from "./context/AuthContext"
import AuthorPublisherHomepage from "@/components/AuthorPublisherHomepage"
import DefaultHomepage from "@/components/DefaultHomepage"
import HomepageSkeleton from "@/components/HomepageSkeleton"

export default function Home() {
  const { user } = useAuth()

  if (user === null) {
    return <HomepageSkeleton />
  }

  if (user?.role === "author" || user?.role === "publisher") {
    return <AuthorPublisherHomepage />
  }

  if (user?.role === "reader" || !user) {
    return <DefaultHomepage />
  }
}
