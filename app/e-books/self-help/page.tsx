// app/e-books/self-help/page.tsx

"use client"

import { useEffect, useState } from "react"

interface Book {
  _id: string
  title: string
  author: string
  category: string
  description: string
  imageUrl: string
  // add any other fields your book model has
}

export default function SelfHelpBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSelfHelpBooks = async () => {
      try {
        const res = await fetch("/api/books?category=Self-help")
        const data = await res.json()
        setBooks(data)
      } catch (err) {
        console.error("Failed to fetch self-help books:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSelfHelpBooks()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Self-Help Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No self-help books found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <li key={book._id} className="border p-4 rounded shadow">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="mt-2 text-sm">{book.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
