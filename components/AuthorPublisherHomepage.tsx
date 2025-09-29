"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import Link from "next/link"
import AuthorPublisherSkeleton from "./AuthorPublisherSkeleton"

interface Book {
  _id: string
  title: string
  imageUrl: string
  readCount?: number
  likesCount?: number
  downloadCount?: number
  favoritesCount?: number
  updatedAt: string
}

const AuthorPublisherHomepage = () => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loadingBooks, setLoadingBooks] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user || (user.role !== "author" && user.role !== "publisher")) {
        console.log("Redirecting because user role is:", user?.role)
        router.replace("/")
      } else {
        fetchBooks()
      }
    }
  }, [user, loading])

  const fetchBooks = async () => {
    try {
      setLoadingBooks(true)
      const res = await fetch(`/api/books`)
      if (!res.ok) throw new Error("Failed to fetch books")
      const data = await res.json()
      const userBooks = data.books.filter(
        (book: Book & { uploader: string }) => book.uploader === user?.id
      )
      setBooks(userBooks)
    } catch (error) {
      console.error("Error fetching books: ", error)
    } finally {
      setLoadingBooks(false)
    }
  }

  const totalBooksReadCount = () => {
    let readCount = 0

    books.forEach((book) => {
      readCount += book.readCount || 0
    })

    return readCount
  }
  const totalBooksLikesCount = () => {
    let likesCount = 0

    books.forEach((book) => {
      likesCount += book.likesCount || 0
    })

    return likesCount
  }

  const formattedRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : ""

  return (
    <section className="p-5">
      {/* Header */}
      <header className="flex items-center justify-between pb-10 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">
          {user?.role === "author" ? "Author" : "Publisher"} Dashboard
        </h1>
        <Link
          href="/book-insights"
          className="text-sm text-black hover:underline"
        >
          View Insights
        </Link>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-start my-10 max-w-6xl mx-auto">
        <div className="flex-1 p-5">
          <img
            src={user?.profileImage}
            alt={user?.firstName}
            className="h-56 w-56 rounded-full"
          />
        </div>
        <div className="flex-1 p-5">
          <h3>
            {user?.role === "author" ? "Author" : "Publisher"} Name:{" "}
            <span className="font-medium">
              {user?.firstName + " " + user?.secondName}
            </span>
          </h3>
          <p>
            {user?.role === "author" ? "Author" : "Publisher"} role:{" "}
            <span className="font-medium">{formattedRole}</span>
          </p>
          <p>
            Total read count:
            <span className="font-medium"> {totalBooksReadCount()}</span>
          </p>
          <p>
            Total likes count:
            <span className="font-medium"> {totalBooksLikesCount()}</span>
          </p>

          <p>
            Published books:
            <span className="font-medium"> {books.length}</span>
          </p>
        </div>
      </section>

      {/* <p className="">
        Welcome to the dashboard, here you can manage your books, view read
        analytics, and more.
      </p> */}

      <h3 className="text-md px-3 py-1 rounded font-medium max-w-6xl mx-auto">
        Books Overview
      </h3>

      {/* Books Analytics Dashboard */}
      {loadingBooks ? (
        <div>
          <AuthorPublisherSkeleton />
          <AuthorPublisherSkeleton />
        </div>
      ) : books.length === 0 ? (
        <p>No books published yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl max-sm:max-w-sm mx-auto gap-6 p-5">
          {books.map((book) => (
            <div
              key={book._id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <img src={book.imageUrl} alt={book.title} className="h-56 mb-2" />
              <h2 className="text-lg font-semibold text-[#c8553d] hover:underline mb-1">
                {book.title}
              </h2>
              <p className="text-sm text-black mb-2">
                Published:{" "}
                <span className="text-gray-500">
                  {new Date(book.updatedAt).toLocaleDateString()}
                </span>
              </p>

              <div className="flex flex-col gap-1">
                <p>📖 Reads: {book.readCount}</p>
                <p>⭐ Favorites: {book.favoritesCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default AuthorPublisherHomepage
