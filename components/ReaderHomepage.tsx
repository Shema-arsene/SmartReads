import Image from "next/image"
import Link from "next/link"
import React from "react"

const ReaderHomepage = () => {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6">
        {/* Background Image */}
        <Image
          src="https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg"
          alt="Hero Image"
          fill
          priority
          className="object-cover -z-10"
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* Hero Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Read anywhere. Anytime
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mt-8">
          Discover the best reads on various topics of interest.
        </p>
        <p className="text-lg text-white">Cancel anytime.</p>

        <Link
          href="/"
          className="mt-6 border border-gray-200 bg-white text-black font-medium px-6 py-3
                     rounded-lg hover:bg-gray-100 hover:text-gray-900 duration-300"
        >
          Start your free 30 days
        </Link>
      </section>

      {/* Other content below */}
      <section className="p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Explore More Books</h2>
        <p>
          This is where the rest of your homepage content can go — featured
          books, categories, etc.
        </p>
      </section>
    </main>
  )
}

export default ReaderHomepage
