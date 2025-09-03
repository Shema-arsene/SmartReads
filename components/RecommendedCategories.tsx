"use client"

import React, { useRef } from "react"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

const RecommendedCategories = () => {
  const categories = [
    { _id: "1", name: "Religion", imageUrl: "https://via.placeholder.com/150" },
    { _id: "2", name: "Fiction", imageUrl: "https://via.placeholder.com/150" },
    {
      _id: "3",
      name: "Non-fiction",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "4",
      name: "Biography",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "5",
      name: "Self-help",
      imageUrl: "https://via.placeholder.com/150",
    },
    { _id: "6", name: "Science", imageUrl: "https://via.placeholder.com/150" },
    {
      _id: "7",
      name: "Technology",
      imageUrl: "https://via.placeholder.com/150",
    },
    { _id: "8", name: "History", imageUrl: "https://via.placeholder.com/150" },
    { _id: "9", name: "Children", imageUrl: "https://via.placeholder.com/150" },
    { _id: "10", name: "Romance", imageUrl: "https://via.placeholder.com/150" },
    {
      _id: "11",
      name: "Thriller",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "12",
      name: "Fiction",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "13",
      name: "Mystery",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "14",
      name: "Science Fiction",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      _id: "15",
      name: "Fantasy",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    })
  }

  return (
    <section className="px-6 py-10 relative">
      <h2 className="text-2xl font-semibold mb-6">Recommended categories</h2>

      {/* Left Arrow */}

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white outline outline-gray-900 hover:outline-2 rounded-full 
              shadow-md z-10 cursor-pointer p-2"
      >
        <FaChevronLeft size={30} />
      </button>

      {/* Scrollable Category List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth"
      >
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex-shrink-0 w-44 border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-28 w-full relative">
              <img
                src={category.imageUrl}
                alt={category.name}
                // fill
                className="object-cover"
              />
            </div>
            <p className="text-sm px-3 py-2 text-blue-700 font-medium">
              {category.name}
            </p>
          </div>
        ))}
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

export default RecommendedCategories
