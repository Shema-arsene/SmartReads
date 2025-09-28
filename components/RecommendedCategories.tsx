"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    { _id: "12", name: "Fiction", imageUrl: "https://via.placeholder.com/150" },
    { _id: "13", name: "Mystery", imageUrl: "https://via.placeholder.com/150" },
    {
      _id: "14",
      name: "Science Fiction",
      imageUrl: "https://via.placeholder.com/150",
    },
    { _id: "15", name: "Fantasy", imageUrl: "https://via.placeholder.com/150" },
  ]

  return (
    <section className="px-6 py-10 relative max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Recommended categories</h2>
      <p className="text-sm text-gray-500 mb-6">Read based on categories</p>

      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category._id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="overflow-hidden hover:shadow-lg transition">
                <CardContent className="p-0">
                  <div className="h-28 w-full relative">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      width={200}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm px-3 py-2 text-blue-700 font-medium">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default RecommendedCategories
