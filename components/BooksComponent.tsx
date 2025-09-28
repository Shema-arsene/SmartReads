"use client"

import React, { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import BooksSkeleton from "./BooksSkeleton"
import Link from "next/link"

const BooksComponent = ({
  books,
  title,
  subTitle,
  loading,
  error,
}: {
  books: any[]
  title: string
  subTitle: string
  loading: boolean
  error: string
}) => {
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
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {subTitle && <p className="text-sm text-gray-500 mb-4">{subTitle}</p>}

      <div className="max-w-5xl mx-auto">
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
                  <div>
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-4 space-y-3">
                        <Link href={`/e-books/${book._id}`}>
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-56 object-cover rounded-md"
                          />
                        </Link>
                        <Link href={`/e-books/${book._id}`}>
                          <h3 className="text-lg font-semibold text-center">
                            {book.title}
                          </h3>
                        </Link>
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
    </section>
  )
}

export default BooksComponent
