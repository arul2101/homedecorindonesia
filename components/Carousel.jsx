"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

  const slides = [
    {
      id: 1,
      title: "CLEARANCE",
      subtitle: "SALE",
      discount: "UP TO 70%",
      buttonText: "SHOP NOW",
      type: "clearance",
      mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
      productImages: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      title: "NEW",
      subtitle: "ARRIVALS",
      discount: "FRESH DESIGNS",
      buttonText: "EXPLORE",
      type: "new-arrivals",
      mainImage: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&h=800&fit=crop",
      productImages: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493663284031-b7e3aeca4018?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      title: "PREMIUM",
      subtitle: "COLLECTION",
      discount: "LUXURY PIECES",
      buttonText: "VIEW ALL",
      type: "premium",
      mainImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop",
      productImages: [
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571898837421-4f8d9d90c6f3?w=400&h=300&fit=crop"
      ]
    }
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => prevSlide < slides.length - 1 ? prevSlide + 1 : 0)
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100">
      <div className="relative w-full h-full">
        <div className="relative w-full h-full flex items-center">
          <div className="absolute inset-0 flex">
            <div className="flex-1 slideshow">
              {slides.map((slide, index) => (
                <Image
                  key={index}
                  src={slide.mainImage}
                  className={index === currentSlide ? 'active' : ''}
                  alt='image slideshow'
                  fill
                />
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}