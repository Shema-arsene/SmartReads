import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import BooksComponent from "./BooksComponent"
import RecommendedCategories from "./RecommendedCategories"
import BookSlider from "./BooksSlider"

type Book = {
  _id: string
  title: string
  author: string
  imageUrl: string
  category: string
  price: number
  createdAt: string
  description: string
  bookFile: string
}
type Publisher = {
  _id: string
  name: string
  firstName: string
  secondName: string
  bio: string
}

type Author = {
  _id: string
  name: string
  firstName: string
  secondName: string
  bio: string
}

const ReaderHomepage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) throw new Error("Failed to fetch books")

      const data = await response.json()
      setBooks(data.books)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const fetchAllAuthors = async () => {
    try {
      const response = await fetch("/api/user/getAuthors", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) throw new Error("Failed to fetch authors")

      const data = await response.json()
      setAuthors(data.users)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPublishers = async () => {
    try {
      const response = await fetch("/api/user/getPublishers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) throw new Error("Failed to fetch publishers")

      const data = await response.json()
      setPublishers(data.users)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllBooks()
    fetchAllAuthors()
    fetchAllPublishers()
  }, [])

  return (
    <main className="">
      {/* Hero Slider */}
      <BookSlider />

      {/* Best Sellers */}
      <section className="p-5 max-w-5xl mx-auto">
        <BooksComponent
          title="Bestselling Books & Audiobooks"
          subTitle=""
          books={books as Book[]}
        />
      </section>

      <section className="p-5 max-w-5xl mx-auto">
        <BooksComponent
          title="Current New York Times Bestsellers"
          subTitle="
          The fiction and nonfiction that everyone’s talking about right now."
          books={books as Book[]}
        />
      </section>

      {/* Recommended Categories */}
      <section className="p-5 max-w-5xl mx-auto">
        <RecommendedCategories />
      </section>
    </main>
  )
}

export default ReaderHomepage
