"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

const BooksComponent = ({
  books,
  title,
  subTitle,
}: {
  books: any[]
  title: string
  subTitle: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  //   console.log("Fetched Books:", books)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    })
  }

  return (
    <section className="px-6 py-10 relative">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {subTitle && <p className="text-sm text-gray-500 mb-4">{subTitle}</p>}

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white outline outline-gray-900 hover:outline-2 rounded-full 
        shadow-md z-10 cursor-pointer p-2"
      >
        <FaChevronLeft size={30} />
      </button>

      {/* Scrollable Book List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 scroll-smooth"
      >
        {books.map((book) => {
          const publishedDate = new Date(book.createdAt).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          )

          return (
            <div
              key={book._id}
              className="flex-shrink-0 w-48 bg-white rounded-lg p-3 border hover:shadow-lg transition"
            >
              <Link href={`/e-books/${book._id}`}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-56 object-cover transition duration-300 hover:opacity-90 rounded-t-lg"
                />
              </Link>
              <p className="text-xs text-gray-500 mt-2">{book.category}</p>
              <Link href={`/e-books/${book._id}`}>
                <h3 className="font-semibold text-sm mt-1 truncate">
                  {book.title}
                </h3>
              </Link>
              <Link
                href={`/authors/${book.author}`}
                className="text-xs text-gray-600"
              >
                By: {book.author}
              </Link>
              <p className="text-xs text-gray-400 mt-1">
                Published: {publishedDate}
              </p>
              <p className="text-sm font-medium mt-1">${book.price}</p>
            </div>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white outline outline-gray-600 hover:outline-2
                  rounded-full shadow-md z-10 cursor-pointer p-2"
      >
        <FaChevronRight size={30} />
      </button>
    </section>
  )
}

export default BooksComponent
