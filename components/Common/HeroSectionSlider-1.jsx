'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroSectionSlider1({ slides, autoPlayInterval = 5000, showDots = true, showArrows = true }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [slides.length, autoPlayInterval])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
            <div className="relative h-full">
              {/* Content container with customizable positioning */}
              <div className={`absolute inset-0 flex items-center justify-center px-4 ${
                slide.contentPosition || 'items-center justify-center'
              }`}
              style={slide.contentStyle || {}}
              >
                <div className="text-center text-white max-w-4xl">
                  <h1 className="text-5xl md:text-8xl font-extralight tracking-wider mb-4 text-center">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl font-light tracking-wide text-center max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>

                  {/* Button Section */}
                  {slide.button && (
                    <div className="mt-8">
                      {slide.button.href ? (
                        <Link
                          href={slide.button.href}
                          className={`group inline-flex items-center px-10 py-4 font-light tracking-wide text-base transition-all duration-500 transform rounded-[25px] overflow-hidden animate-fadeInUp relative ${
                            slide.button.variant === 'outline'
                              ? 'border-2 border-white text-white hover:scale-105 hover:shadow-2xl hover:shadow-white/25'
                              : slide.button.variant === 'secondary'
                              ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/25'
                              : 'bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white hover:scale-105 hover:shadow-2xl hover:shadow-white/25'
                          }`}
                        >
                          <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1 flex items-center gap-2">
                            {slide.button.text}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                          {slide.button.variant === 'outline' && (
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          )}
                          {slide.button.variant !== 'outline' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          )}
                        </Link>
                      ) : (
                        <button
                          onClick={slide.button.onClick}
                          className={`group inline-flex items-center px-10 py-4 font-light tracking-wide text-base transition-all duration-500 transform rounded-[25px] overflow-hidden animate-fadeInUp relative ${
                            slide.button.variant === 'outline'
                              ? 'border-2 border-white text-white hover:scale-105 hover:shadow-2xl hover:shadow-white/25'
                              : slide.button.variant === 'secondary'
                              ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/25'
                              : 'bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white hover:scale-105 hover:shadow-2xl hover:shadow-white/25'
                          }`}
                        >
                          <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1 flex items-center gap-2">
                            {slide.button.text}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                          {slide.button.variant === 'outline' && (
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                          )}
                          {slide.button.variant !== 'outline' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls - Arrows */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slider Dots */}
        {showDots && slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Stagger animation for multiple buttons */
        .animate-fadeInUp:nth-child(1) {
          animation-delay: 0.2s;
        }

        .animate-fadeInUp:nth-child(2) {
          animation-delay: 0.3s;
        }

        .animate-fadeInUp:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}