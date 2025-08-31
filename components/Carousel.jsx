"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ClearanceImg from "@/public/img/carousel-img-homepage.png";
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "CLEARANCE",
    subtitle: "SALE",
    discount: "UP TO 70%",
    buttonText: "SHOP NOW",
    type: "clearance",
    mainImage: ClearanceImg,
  }
];

export default function Carousel({ isActiveButton }) {
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
                <>
                  <Image
                    key={index}
                    src={slide.mainImage}
                    className={index === currentSlide ? 'active object-center' : ''}
                    alt='image slideshow'
                  />

                  <Link href='/product-category/home-decor-furniture-sale30-70' className='absolute md:px-6 py-4 md:text-4xl text-xl px-4 rounded-3xl hover:bg-white hover:text-black border hover:border-yellow-300 transition-all bg-red-500 right-[10%] sm:right-[20%] md:right-[27%] bottom-[5%] text-white z-[9999]'>Shop Sale</Link>
                </>
              ))}
            </div>
          </div>
        </div>

        {isActiveButton && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}