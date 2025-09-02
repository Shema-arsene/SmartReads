import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import BooksComponent from "./BooksComponent"
import RecommendedCategories from "./RecommendedCategories"

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

const ReaderHomepage = () => {
  const [books, setBooks] = useState<Book[]>([])
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

  useEffect(() => {
    fetchAllBooks()
  }, [])

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6">
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
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Read anywhere. Anytime
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mt-8">
          Discover the best reads on various topics of interest.
        </p>
        <p className="text-lg text-white">Cancel anytime.</p>

        <Link
          href="/checkout"
          className="mt-6 border border-gray-200 bg-white text-black font-medium px-6 py-3
                     rounded-lg hover:bg-gray-100 hover:text-gray-900 duration-300"
        >
          Start your free 30 days
        </Link>
      </section>

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
