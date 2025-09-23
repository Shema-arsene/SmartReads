"use client"

import { Globe, MapPin, Star } from "lucide-react"
import { useState, useEffect } from "react"

const slides = [
  {
    image:
      "https://images.pexels.com/photos/33278756/pexels-photo-33278756.jpeg",
    title: "Discover the Heart of",
    subtitle: "Africa - Rwanda",
    description:
      "From studying in the Land of a Thousand Hills to exploring Volcanoes National Park, we make your Rwandan adventure unforgettable with comprehensive travel solutions.",
  },
  {
    image:
      "https://images.pexels.com/photos/10544959/pexels-photo-10544959.jpeg",
    title: "Experience Gorilla",
    subtitle: "Trekking Adventures",
    description:
      "Get up close with mountain gorillas in their natural habitat at Volcanoes National Park, one of Rwanda's most incredible wildlife experiences.",
  },
  {
    image: "https://images.pexels.com/photos/9174680/pexels-photo-9174680.jpeg",
    title: "Relax at Beautiful",
    subtitle: "Lake Kivu",
    description:
      "Unwind at one of Africa's great lakes with stunning beaches, water sports, and breathtaking sunsets in the heart of Rwanda.",
  },
  {
    image: "https://images.pexels.com/photos/9560066/pexels-photo-9560066.jpeg",
    title: "Explore Modern",
    subtitle: "Kigali City",
    description:
      "Discover Rwanda's vibrant capital with its clean streets, cultural sites, and growing reputation as Africa's Singapore.",
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
          <h1 className="text-5xl md:text-7xl font-bold mb-12 text-balance leading-tight">
            {slides[currentSlide].title}
            <span className="text-[#a5be00] block mt-4">
              {slides[currentSlide].subtitle}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-16 text-pretty max-w-3xl mx-auto leading-relaxed opacity-95">
            {slides[currentSlide].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-4 rounded-full mr-4 backdrop-blur-sm">
                  <Globe className="h-8 w-8 text-[#a5be00]" />
                </div>
                <span className="text-4xl font-bold">15+</span>
              </div>
              <p className="text-lg opacity-90">Years in Rwanda Tourism</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-4 rounded-full mr-4 backdrop-blur-sm">
                  <MapPin className="h-8 w-8 text-[#a5be00]" />
                </div>
                <span className="text-4xl font-bold">5K+</span>
              </div>
              <p className="text-lg opacity-90">Visitors to Rwanda</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#679436]/20 p-4 rounded-full mr-4 backdrop-blur-sm">
                  <Star className="h-8 w-8 text-[#a5be00]" />
                </div>
                <span className="text-4xl font-bold">4.9</span>
              </div>
              <p className="text-lg opacity-90">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookSlider
