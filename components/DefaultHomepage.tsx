import React, { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import BooksComponent from "./BooksComponent"
import RecommendedCategories from "./RecommendedCategories"
import BookSlider from "./BooksSlider"

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

      {/* Best Sellers */}
      {loading ? (
        <div className="block w-fit mx-auto my-10">
          <div className="flex flex-col gap-3 p-5">
            <div className="mb-2 space-y-3">
              <Skeleton className="h-6 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden md:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden sm:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden lg:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
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
        <div className="block w-fit mx-auto my-10">
          <div className="flex flex-col gap-3 p-5">
            <div className="mb-2 space-y-3">
              <Skeleton className="h-6 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden md:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden sm:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="hidden lg:block space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
          </div>
        </div>
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
        <div className="block w-fit mx-auto">
          <div className="flex flex-col gap-3 p-5">
            <div className="mb-2 space-y-3">
              <Skeleton className="h-6 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <Skeleton className="hidden md:block h-[125px] w-[250px] rounded-xl" />
              <Skeleton className="hidden sm:block h-[125px] w-[250px] rounded-xl" />
              <Skeleton className="hidden lg:block h-[125px] w-[250px] rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <section className="p-5 max-w-5xl mx-auto">
          <RecommendedCategories />
        </section>
      )}
    </main>
  )
}

export default ReaderHomepage
