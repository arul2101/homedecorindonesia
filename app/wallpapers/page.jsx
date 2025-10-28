'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Ruler,
  Palette,
  Home,
  Star,
  Check,
  ArrowRight
} from 'lucide-react'
import HeroSectionSlider1 from '@/components/Common/HeroSectionSlider-1'
import Showrooms from '@/components/Homepage/Showrooms'
import ProductsGrid from '@/components/ProductsGrid'

export default function WallpapersPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState('living')

  const heroSlides = [
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/1-120-scaled.jpg',
      title: 'Luxury Wallpaper Collection',
      subtitle: 'Transform your space with exclusive premium designs from around the world',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Explore Collection',
        href: '#wallpaper-collection',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/2-75-scaled.jpg',
      title: 'Custom Design Service',
      subtitle: 'Bespoke wallpaper patterns tailored to your unique style and vision',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Get Consultation',
        href: '#custom-design',
        variant: 'outline'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/4-9-scaled.jpg',
      title: 'Professional Installation',
      subtitle: 'Expert installation services ensuring flawless results every time',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Book Installation',
        href: '#installation',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/5-4-scaled.jpg',
      title: 'Luxury Wallpaper Collection',
      subtitle: 'Transform your space with exclusive premium designs from around the world',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Explore Collection',
        href: '#wallpaper-collection',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/07/TEST1.jpg',
      title: 'Custom Design Service',
      subtitle: 'Bespoke wallpaper patterns tailored to your unique style and vision',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Get Consultation',
        href: '#custom-design',
        variant: 'outline'
      }
    }
  ]

  const categories = [
    {
      id: 'luxury-textured',
      name: 'Luxury Textured',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/TEXTURED-WALLPAPER.jpg',
      description: 'Premium textured wallpapers with depth and character',
      href: '/wallpapers/luxury-textured'
    },
    {
      id: 'geometric-patterns',
      name: 'Geometric Patterns',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/GEOMETRIC-WALLPAPER.jpg',
      description: 'Modern geometric designs for contemporary spaces',
      href: '/wallpapers/geometric-patterns'
    },
    {
      id: 'floral-nature',
      name: 'Floral & Nature',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/FLORAL-WALLPAPER.jpg',
      description: 'Beautiful botanical and floral inspired patterns',
      href: '/wallpapers/floral-nature'
    },
    {
      id: 'vintage-classic',
      name: 'Vintage & Classic',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/VINTAGE-WALLPAPER.jpg',
      description: 'Timeless designs inspired by classic elegance',
      href: '/wallpapers/vintage-classic'
    },
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/MINIMALIST-WALLPAPER.jpg',
      description: 'Clean, subtle patterns for sophisticated interiors',
      href: '/wallpapers/modern-minimalist'
    },
    {
      id: 'metallic-premium',
      name: 'Metallic Premium',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/METALLIC-WALLPAPER.jpg',
      description: 'Luxurious metallic finishes for high-end spaces',
      href: '/wallpapers/metallic-premium'
    }
  ]

  const roomVisualizations = [
    {
      id: 'living',
      name: 'Living Room',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/LIVING-ROOM-WALLPAPER.jpg',
      description: 'Create a welcoming atmosphere with stunning accent walls'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/BEDROOM-WALLPAPER.jpg',
      description: 'Transform your personal sanctuary into a dream retreat'
    },
    {
      id: 'dining',
      name: 'Dining Room',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/DINING-ROOM-WALLPAPER.jpg',
      description: 'Elegant settings for memorable dining experiences'
    },
    {
      id: 'office',
      name: 'Home Office',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/OFFICE-WALLPAPER.jpg',
      description: 'Professional and inspiring work environments'
    }
  ]

  const premiumFeatures = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: 'Custom Sizing',
      description: 'Tailored measurements for perfect fit in any space'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Color Matching',
      description: 'Custom color solutions to match your existing decor'
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Room Visualization',
      description: 'See how wallpapers look in your space before purchase'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Materials',
      description: 'High-quality materials from renowned global manufacturers'
    }
  ]

  // Handle product click for navigation
  const handleProductClick = (product) => {
    if (product?.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  const sampleProducts = [
    {
      id: 1,
      name: 'Italian Silk Texture Collection',
      price: 2500000,
      salePrice: 1999999,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/ITALIAN-SILK-WALLPAPER.jpg',
      category: 'Luxury Textured',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Art Deco Geometric Pattern',
      price: 1899999,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/ART-DECO-GEOMETRIC.jpg',
      category: 'Geometric Patterns',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Japanese Cherry Blossom',
      price: 2200000,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/JAPANESE-CHERRY-BLOSSOM.jpg',
      category: 'Floral & Nature',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Victorian Vintage Elegance',
      price: 2800000,
      salePrice: 2499999,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/01/VICTORIAN-VINTAGE.jpg',
      category: 'Vintage & Classic',
      rating: 4.9,
      reviews: 203
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSectionSlider1 slides={heroSlides} autoPlayInterval={5000} />

      {/* Welcome Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
              Premium Wallpaper Collections
            </h2>
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-600 leading-relaxed">
              Discover our exclusive range of luxury wallpapers sourced from renowned international designers.
              From subtle textures to bold patterns, transform your walls into works of art.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="wallpaper-collection" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Explore by Style
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-light tracking-wide mb-2">{category.name}</h3>
                      <p className="text-sm font-light opacity-90 mb-4">{category.description}</p>
                      <Link
                        href={category.href}
                        className="inline-flex items-center gap-2 text-white font-light tracking-wide hover:gap-3 transition-all duration-300"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Visualization Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Visualize in Your Space
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Room Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {roomVisualizations.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`px-6 py-2 rounded-full font-light tracking-wide transition-all duration-300 ${
                    selectedRoom === room.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>

          {/* Room Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-[600px]">
                <Image
                  src={roomVisualizations.find(r => r.id === selectedRoom)?.image}
                  alt={roomVisualizations.find(r => r.id === selectedRoom)?.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Room Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-light tracking-wide mb-3">
                    {roomVisualizations.find(r => r.id === selectedRoom)?.name}
                  </h3>
                  <p className="text-lg font-light opacity-90 max-w-2xl">
                    {roomVisualizations.find(r => r.id === selectedRoom)?.description}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-light tracking-wide rounded-full hover:bg-gray-100 transition-colors">
                    <span>View in AR</span>
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Premium Services & Features
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light tracking-wide mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Featured Collections
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Products Grid */}
          <ProductsGrid products={sampleProducts} viewMode="grid" onProductClick={handleProductClick} />
        </div>
      </section>

      {/* Custom Design CTA Section */}
      <section id="custom-design" className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-wider mb-6 text-white">
              Custom Wallpaper Design
            </h2>
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-300 mb-12 max-w-2xl mx-auto">
              Let our designers create a unique wallpaper pattern exclusively for your space.
              From concept to installation, we bring your vision to life.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-white">01</span>
                </div>
                <h3 className="text-white font-light tracking-wide mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm font-light">Personalized design consultation to understand your style</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-white">02</span>
                </div>
                <h3 className="text-white font-light tracking-wide mb-2">Design Creation</h3>
                <p className="text-gray-400 text-sm font-light">Custom patterns tailored to your specifications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-white">03</span>
                </div>
                <h3 className="text-white font-light tracking-wide mb-2">Installation</h3>
                <p className="text-gray-400 text-sm font-light">Professional installation for perfect results</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-white to-gray-100 text-black font-medium tracking-wide transition-all duration-500 transform hover:scale-105 hover:shadow-2xl rounded-full"
            >
              <span>Start Custom Design</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Installation Services Section */}
      <section id="installation" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
                Professional Installation Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our team of expert installers ensures flawless application of your chosen wallpapers.
                With years of experience and attention to detail, we guarantee perfect results.
              </p>

              <div className="space-y-6">
                {[
                  'Expert installation by certified professionals',
                  'Surface preparation and wall treatment',
                  'Seamless pattern matching',
                  'Clean and efficient service',
                  'Post-installation inspection and cleanup',
                  '1-year workmanship warranty'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-3 bg-black text-white font-light tracking-wide rounded-full hover:bg-gray-800 transition-colors"
                >
                  <span>Book Installation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://www.homedecorindonesia.com/wp-content/uploads/2024/01/WALLPAPER-INSTALLATION.jpg"
                alt="Professional Wallpaper Installation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <Showrooms />

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
      `}</style>
    </div>
  )
}