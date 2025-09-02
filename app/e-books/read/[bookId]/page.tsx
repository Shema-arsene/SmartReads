"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import BookReader from "@/components/BookReader"

interface Book {
  _id: string
  title: string
  bookFile: string
}

export default function ReadBookPage() {
  const { bookId } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${bookId}`)
      const data = await res.json()
      setBook(data)
    } catch (err) {
      console.error("Failed to fetch book:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!bookId) return
    fetchBook()
  }, [bookId])

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 h-screen">
        <div className="w-16 h-16 border-4 border-[#c8553d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  if (!book) {
    return (
      <div className="flex justify-center items-center mt-20 h-[60]">
        <h1 className="font-medium text-3xl text-center">Book not found.</h1>
      </div>
    )
  }

  return (
    <div className="h-screen w-full">
      <BookReader fileUrl={book.bookFile} bookTitle={book.title} />
    </div>
  )
}
