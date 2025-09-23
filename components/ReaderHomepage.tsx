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
      {/* Hero Section */}
      <section className="relative max-sm:h-[90vh] h-[80vh] sm:max-h-[600px] flex flex-col items-center justify-center text-center px-6">
        {/* Background Image */}
        <Image
          src="https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg"
          alt="Hero Image"
          fill
          priority
          className="object-cover -z-10"
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center py-10 gap-10 md:gap-5 max-w-5xl">
          <aside className="md:flex-1">
            <Image
              src="https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg"
              alt="Hero image"
              width={400}
              height={350}
              className="rounded-sm shadow-lg"
            />
          </aside>
          <aside className="md:flex-1 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
              Read anywhere. Anytime
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mt-8">
              Discover the best reads on various topics of interest.
            </p>
            <p className="text-lg text-gray-400 font-medium">
              Cancel anytime!.
            </p>

            <Link
              href="/checkout"
              className="mt-6 bg-white text-black font-medium px-6 py-3
                     rounded-lg hover:bg-gray-300 hover:text-gray-900 duration-300"
            >
              Start your free 30 days
            </Link>
          </aside>
        </div>
      </section>

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
