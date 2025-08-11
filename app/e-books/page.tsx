"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [])

  console.log("Fetched books:", books)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading books...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-[#fdfdfd]">
      <h1 className="text-4xl font-bold text-[#c8553d] mb-10 text-center">
        E-Books Library
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl border border-[#f3f3f3] shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
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

              <p className="text-[#588b8b] text-sm mb-1">By: {book.author}</p>
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
      </div>
    </section>
  )
}
