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
  return (
    <section className="px-6 md:px-0 py-10 relative">
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
                  className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div>
                    <Card>
                      <CardContent className="flex flex-col items-start justify-center p-4 space-y-3">
                        <Link href={`/e-books/${book._id}`}>
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="rounded-xl w-full h-56 object-cover transition duration-300 hover:opacity-90"
                          />
                        </Link>
                        <Link href={`/e-books/${book._id}`}>
                          <h3 className="text-lg font-semibold text-[#c8553d] hover:underline mb-1">
                            {book.title}
                          </h3>
                        </Link>
                        <p className="text-[#588b8b] text-sm mb-1">
                          By: {book.author}
                        </p>
                        <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">
                          By: {book.category}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                          By: {book.description.substring(0, 30) + "..."}
                        </p>
                        <span className="ml-auto mr-1 text-right text-[#f28f3b] font-semibold text-base">
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
