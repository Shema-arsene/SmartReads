"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { FiBookOpen, FiDownload } from "react-icons/fi"

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

  console.log("Book data:", book)

  //   Handle download functionality (Function not being used)
  // const handleDownload = async () => {
  //   const res = await fetch(`/api/books/download/${book?._id}`)
  //   if (res.redirected) {
  //     window.location.href = res.url // Triggers file download
  //   }
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 h-screen">
        <div className="w-16 h-16 border-4 border-[#c8553d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!book) return <p className="p-8">Book not found.</p>

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full md:w-64 h-72 object-cover rounded-lg border border-gray-200"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-[#dc2626] mb-3">
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

          <aside className="my-3 flex items-center justify-between">
            {/* <button>
              <a
                href={`/api/books/download/${book._id}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-[#c8553d] text-white rounded-lg hover:bg-[#b43f30] transition-colors"
              >
                <FiDownload className="mr-2" />
                Download Book
              </a>
            </button> */}

            <button>
              <a
                href={`/e-books/read/${book._id}`}
                className="flex items-center px-4 py-2 bg-[#588b8b] text-white rounded-lg hover:bg-[#476c6c] transition-colors"
              >
                <FiBookOpen className="mr-2" />
                Read Book
              </a>
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}
