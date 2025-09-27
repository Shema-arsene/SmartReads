"use client"

import { BookOpen, Gift, Feather } from "lucide-react"
import { useState, useEffect } from "react"

const slides = [
  {
    image: "https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg",
    title: "Read Anywhere",
    subtitle: "Anytime",
    description:
      "Whether you're on a bus, at a café, or winding down at home, SmartReads gives you instant access to your favorite stories and knowledge without limits.",
  },
  {
    image: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg",
    title: "Discover New",
    subtitle: "Voices & Authors",
    description:
      "Dive into books from emerging writers and established authors. Explore fresh perspectives, unique voices, and stories that stay with you.",
  },
  {
    image: "https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg",
    title: "Build Your",
    subtitle: "Personal Library",
    description:
      "Save favorites, create collections, and craft your own library that grows with you — a reading space designed to fit your journey.",
  },
  {
    image: "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg",
    title: "Join a Growing",
    subtitle: "Reader Community",
    description:
      "Connect with fellow readers, share insights, and be part of a vibrant community that celebrates stories and ideas together.",
  },
]

const BookSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-36">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={`${slide.title} ${slide.subtitle}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold mb-12 text-balance leading-tight">
            {slides[currentSlide].title}
            <span className="text-[#a5be00] block">
              {slides[currentSlide].subtitle}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-pretty max-w-3xl mx-auto leading-relaxed opacity-95">
            {slides[currentSlide].description}
          </p>

          {/* CTA */}
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
            {/* Start Free Trial */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-2 md:p-4 mb-2 rounded-full md:mr-4 backdrop-blur-sm">
                  <Gift className="h-4 w-4 md:h-8 md:w-8 text-[#a5be00]" />
                </div>
                <span className="text-sm md:text-2xl font-semibold">
                  Start Free Trial
                </span>
              </div>
              <p className="text-xs md:text-lg opacity-90">
                Enjoy 30 days of unlimited reading at no cost.
              </p>
            </div>

            {/* Become an Author */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-2 md:p-4 mb-2 rounded-full md:mr-4 backdrop-blur-sm">
                  <Feather className="h-4 w-4 md:h-8 md:w-8 text-[#a5be00]" />
                </div>
                <span className="text-sm md:text-2xl font-semibold">
                  Become an Author
                </span>
              </div>
              <p className="text-xs md:text-lg opacity-90">
                Share your stories with a growing community of readers.
              </p>
            </div>

            {/* Start Reading */}
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-2 md:p-4 mb-2 rounded-full md:mr-4 backdrop-blur-sm">
                  <BookOpen className="h-4 w-4 md:h-8 md:w-8 text-[#a5be00]" />
                </div>
                <span className="text-sm md:text-2xl font-semibold">
                  Start Reading
                </span>
              </div>
              <p className="text-xs md:text-lg opacity-90">
                Dive into thousands of books and discover your next favorite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookSlider
