import React, { useEffect, useState } from "react"
import BooksComponent from "./BooksComponent"
import BooksSkeleton from "./BooksSkeleton"
import CategoriesSkeleton from "./CategoriesSkeleton"
import RecommendedCategories from "./RecommendedCategories"
import BookSlider from "./BooksSlider"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
      {/* Hero Slider */}
      <BookSlider />

      <div className="p-5 max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {loading ? (
              <BooksSkeleton />
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              books.map((book) => (
                <CarouselItem
                  key={book._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-4 space-y-3">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-full h-56 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-semibold text-center">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                        <span className="text-[#f28f3b] font-semibold">
                          ${book.price}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Best Sellers */}
      {loading ? (
        <BooksSkeleton />
      ) : (
        <section className="p-5 max-w-5xl mx-auto">
          <BooksComponent
            title="Bestselling Books & Audiobooks"
            subTitle=""
            books={books as Book[]}
          />
        </section>
      )}

      {loading ? (
        <BooksSkeleton />
      ) : (
        <section className="p-5 max-w-5xl mx-auto">
          <BooksComponent
            title="Current New York Times Bestsellers"
            subTitle="
          The fiction and nonfiction that everyone’s talking about right now."
            books={books as Book[]}
          />
        </section>
      )}

      {/* Recommended Categories */}
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <section className="p-5 max-w-5xl mx-auto">
          <RecommendedCategories />
        </section>
      )}
    </main>
  )
}

export default ReaderHomepage
