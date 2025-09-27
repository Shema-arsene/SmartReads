"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { bookCategories } from "@/components/PublishBookForm"
import BooksSkeleton from "@/components/BooksSkeleton"

type Book = {
  _id: string
  title: string
  author: string
  category: string
  description: string
  price: number
  imageUrl: string
  bookFile: string
}

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeCategory, setActiveCategory] = useState("All Categories")

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      const data = await response.json()
      setBooks(data.books)
      setFilteredBooks(data.books)
    } catch (err: any) {
      setError(`Something went wrong: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  useEffect(() => {
    if (activeCategory === "All Categories" || activeCategory === "") {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter((book) => book.category === activeCategory)
      setFilteredBooks(filtered)
    }
  }, [activeCategory, books])

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center mt-20 h-60">
  //       <p className="text-red-600 text-xl">{error}</p>
  //     </div>
  //   )
  // }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-[#fdfdfd]">
      <div className="flex flex-col items-center space-y-3.5">
        <h1 className="text-3xl font-bold text-[#c8553d]">E-Books Library</h1>
        <p className="text-lg font-medium">What interests you</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 py-10 px-6">
        <form action="">
          <input
            type="text"
            placeholder="Search books, authors, genres..."
            className="md:w-xs lg:w-lg rounded-full border border-black px-5 py-2 text-gray-600"
          />
        </form>

        <div>
          <label htmlFor="category" className="text-xl mr-2">
            Filter books:
          </label>
          <select
            id="category"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="ml-4 p-2 border rounded-md"
          >
            {bookCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <BooksSkeleton />
        ) : (
          <>
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl border border-[#f3f3f3] max-w-[350px] mx-auto shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
              >
                <Link href={`/e-books/${book._id}`}>
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-56 object-cover transition duration-300 hover:opacity-90"
                  />
                </Link>

                <div className="p-4">
                  <Link href={`/e-books/${book._id}`}>
                    <h2 className="text-xl font-semibold text-[#c8553d] hover:underline mb-1">
                      {book.title}
                    </h2>
                  </Link>

                  <p className="text-[#588b8b] text-sm mb-1">
                    By: {book.author}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">
                    {book.category}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                    {book.description}
                  </p>

                  <p className="text-right text-[#f28f3b] font-semibold text-base">
                    ${book.price}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
