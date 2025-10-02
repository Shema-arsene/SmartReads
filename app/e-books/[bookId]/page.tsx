"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { FiBookOpen, FiDownload } from "react-icons/fi"
import { Skeleton } from "@/components/ui/skeleton"

interface Book {
  _id: string
  title: string
  author: string
  category: string
  description: string
  imageUrl: string
  bookFile: string
}

export default function BookDetailPage() {
  const { bookId } = useParams()
  const router = useRouter()

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
      <div className="flex items-center justify-start py-10 px-5">
        <div className="flex flex-col lg:flex-row space-y-3 gap-3">
          <Skeleton className="h-[200px] w-[250px] rounded-xl" />
          <div className="flex flex-col gap-2 px-2 lg:my-5">
            <Skeleton className="h-5 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-7 w-[200px]" />
          </div>
        </div>
      </div>
    )
  }

  if (!book) return <p className="p-8">Book not found.</p>

  return (
    <div className="my-10 mx-5 px-5 rounded-lg shadow-md p-6 w-fit md:mx-10 xl:mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 w-fit">
        <div className="flex-1 flex items-center justify-center max-sm:py-5">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-72 md:w-full h-72 object-cover rounded-lg border border-gray-200"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-[#dc2626] mb-3 whitespace-pre-wrap">
            {book.title}
          </h1>
          <p className="text-lg text-gray-800 font-medium mb-2">
            <span className="text-black">Author:</span> {book.author}
          </p>
          <p className="text-md text-gray-600 mb-4">
            <span className="text-black font-semibold">Category:</span>{" "}
            {book.category}
          </p>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>

          <button>
            <a
              href={`/e-books/read/${book._id}`}
              className="flex items-center px-4 py-2 my-3 bg-[#588b8b] text-white rounded-lg hover:bg-[#476c6c] transition-colors whitespace-nowrap"
            >
              <FiBookOpen className="mr-2" />
              Read Book
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}
