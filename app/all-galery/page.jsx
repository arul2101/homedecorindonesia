'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PhotoGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Gallery images from showroom collection
  const galleryImages = [
    {
      id: 1,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c1.png',
      alt: 'Showroom Display 1',
      category: 'Living Room'
    },
    {
      id: 2,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c2.png',
      alt: 'Curtain Collection 1',
      category: 'Curtains'
    },
    {
      id: 3,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c3.png',
      alt: 'Furniture Display 1',
      category: 'Furniture'
    },
    {
      id: 4,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c4.png',
      alt: 'Showroom Interior 1',
      category: 'Interior'
    },
    {
      id: 5,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c5.png',
      alt: 'Fabric Collection 1',
      category: 'Fabrics'
    },
    {
      id: 6,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c6.png',
      alt: 'Modern Living Setup',
      category: 'Living Room'
    },
    {
      id: 7,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c7.png',
      alt: 'Blind Collection 1',
      category: 'Blinds'
    },
    {
      id: 8,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c8.png',
      alt: 'Design Consultation',
      category: 'Service'
    },
    {
      id: 9,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c9.png',
      alt: 'Showroom Display 2',
      category: 'Showroom'
    },
    {
      id: 10,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c10.png',
      alt: 'Custom Furniture 1',
      category: 'Furniture'
    },
    {
      id: 11,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c11.png',
      alt: 'Upholstery Work 1',
      category: 'Upholstery'
    },
    {
      id: 12,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c12.png',
      alt: 'Completed Project 1',
      category: 'Projects'
    },
    {
      id: 13,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c13.png',
      alt: 'Modern Interior Design',
      category: 'Interior'
    },
    {
      id: 14,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c14.png',
      alt: 'Fabric Samples Display',
      category: 'Fabrics'
    },
    {
      id: 15,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c15.png',
      alt: 'Customer Project 1',
      category: 'Projects'
    },
    {
      id: 16,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c16.png',
      alt: 'Showroom Display 3',
      category: 'Showroom'
    },
    {
      id: 17,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c17.png',
      alt: 'Luxury Furniture 1',
      category: 'Furniture'
    },
    {
      id: 18,
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c18.png',
      alt: 'Team at Work',
      category: 'Service'
    }
  ]

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))]

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openImageModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-7xl font-extralight tracking-wider mb-4 text-center">
            Photo Gallery
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-center max-w-2xl">
            Explore our showroom collection and completed projects
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-light tracking-wide transition-all duration-300 rounded-full ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-md break-inside-avoid mb-6 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
                onClick={() => openImageModal(image)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg font-light tracking-wide mb-1">{image.alt}</h3>
                      <p className="text-sm text-gray-300">{image.category}</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-light tracking-wide rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-light text-gray-500">
                No images found in {selectedCategory} category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-light tracking-wide">{selectedImage.alt}</h3>
              <p className="text-sm text-gray-300 mt-1">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

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

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}