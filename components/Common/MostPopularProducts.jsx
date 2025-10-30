'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, ShoppingCart, Eye, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const MostPopularProducts = ({
  title = "Most Popular Products",
  subtitle = "Discover our best-selling furniture pieces loved by our customers",
  className = '',
  showWishlist = true,
  showQuickView = true,
  showRating = true,
  apiEndpoint = '/wp-json/wc/v3/products?orderby=popularity&order=desc&per_page=12',
  itemsPerSlide = 4,
  autoPlay = true,
  autoPlayInterval = 4000,
  variant = 'carousel'
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wishlistItems, setWishlistItems] = useState(new Set())
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiEndpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Transform WooCommerce API response to our format
        const transformedProducts = transformWooCommerceProducts(data)
        setProducts(transformedProducts.slice(0, 12)) // Limit to 12 products
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)

        // Fallback to sample data if API fails
        setProducts(getSampleProducts())
      }
    }

    fetchProducts()
  }, [apiEndpoint])

  // Transform WooCommerce API response to our component format
  const transformWooCommerceProducts = (wooProducts) => {
    if (!Array.isArray(wooProducts)) return []

    return wooProducts.map(product => {
      const regularPrice = parseFloat(product.regular_price) || 0
      const salePrice = parseFloat(product.sale_price) || 0
      const hasDiscount = salePrice > 0 && salePrice < regularPrice
      const discountPercentage = hasDiscount
        ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
        : 0

      return {
        id: product.id,
        name: product.name,
        category: product.categories?.[0]?.name || 'Furniture',
        price: salePrice > 0 ? salePrice : regularPrice,
        originalPrice: hasDiscount ? regularPrice : null,
        discount: discountPercentage,
        image: product.images?.[0]?.src || getSampleProducts()[0].image,
        description: product.short_description || product.description || 'Premium quality furniture piece',
        rating: parseFloat(product.average_rating) || 4.5,
        reviews: parseInt(product.rating_count) || 0,
        url: `/product/${product.slug}`,
        features: extractFeaturesFromProduct(product),
        isNew: product.date_created ? isNewProduct(product.date_created) : false,
        stock: product.stock_status === 'instock' ? 10 : 0,
        sku: product.sku
      }
    })
  }

  // Extract features from WooCommerce product data
  const extractFeaturesFromProduct = (product) => {
    const features = []

    if (product.attributes) {
      product.attributes.forEach(attr => {
        if (attr.name && attr.options?.length > 0) {
          features.push(`${attr.name}: ${attr.options[0]}`)
        }
      })
    }

    // Add default features if none found
    if (features.length === 0) {
      features.push('Premium Quality', 'Modern Design', 'Comfortable')
    }

    return features.slice(0, 3) // Limit to 3 features
  }

  // Check if product is new (created within last 30 days)
  const isNewProduct = (dateCreated) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const createdDate = new Date(dateCreated)
    return createdDate > thirtyDaysAgo
  }

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && products.length > itemsPerSlide) {
      const interval = setInterval(() => {
        handleNext()
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, currentIndex, products.length, itemsPerSlide, autoPlayInterval])

  const toggleWishlist = (productId, e) => {
    e.preventDefault()
    setWishlistItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - itemsPerSlide)
    setCurrentIndex(prev => (prev >= maxIndex) ? 0 : prev + 1)
  }

  const handlePrev = () => {
    const maxIndex = Math.max(0, products.length - itemsPerSlide)
    setCurrentIndex(prev => (prev <= 0) ? maxIndex : prev - 1)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getSampleProducts = () => [
    {
      id: 1,
      name: 'Duke Chesterfield Sofa',
      category: 'Living Room',
      price: 21998813,
      originalPrice: 25141500,
      discount: 13,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg',
      description: 'Luxurious Chesterfield sofa with premium upholstery',
      rating: 4.8,
      reviews: 124,
      url: '/product/duke-chesterfield-sofa',
      features: ['Premium Fabric', 'Classic Design'],
      isNew: false
    },
    {
      id: 2,
      name: 'Livorno Single 11 Onyx',
      category: 'Living Room',
      price: 11280375,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/Livorno-Single-11-Onyx.jpg',
      description: 'Elegant armchair with sophisticated onyx finish',
      rating: 4.6,
      reviews: 89,
      url: '/product/livorno-single-11-onyx',
      features: ['Modern Design', 'Comfortable'],
      isNew: true
    }
  ]

  const ProductCard = ({ product }) => {
    const isWishlisted = wishlistItems.has(product.id)
    const isHovered = hoveredProduct === product.id

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex-shrink-0 w-80 border border-gray-100"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Product Image */}
        <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="320px"
              quality={85}
            />
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount Badge */}
          {product.discount && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-bold z-10 shadow-lg"
            >
              -{product.discount}%
            </motion.div>
          )}

          {/* Wishlist Button */}
          {showWishlist && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => toggleWishlist(product.id, e)}
              className={`absolute top-4 right-4 p-2.5 rounded-full z-10 transition-all duration-300 shadow-lg ${
                isWishlisted
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-600/50'
                  : 'bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
          )}

          {/* Quick View and Cart Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
          >
            {showQuickView && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-black transition-colors shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Quick View</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white p-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* New Badge */}
          {product.isNew && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 right-20 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 rounded-full text-sm font-bold z-10 shadow-lg"
            >
              New
            </motion.div>
          )}
        </div>

        {/* Product Content */}
        <div className="p-6">
          {/* Category and Rating Row */}
          <div className="flex items-center justify-between mb-3">
            {product.category && (
              <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                {product.category}
              </p>
            )}
            {showRating && product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">
                  ({product.reviews || 0})
                </span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link href={product.url || '#'} className="block group">
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {product.description.replace(/<[^>]*>/g, '')} {/* Remove HTML tags */}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.originalPrice && product.salePrice ? (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    {formatPrice(product.salePrice)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price || 0)}
                </span>
              )}
            </div>
          </div>

          {/* Product Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 font-medium"
                >
                  {feature.split(':')[0]}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerSlide)
  const totalSlides = Math.max(1, products.length - itemsPerSlide + 1)

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading popular products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <p className="text-red-600">Error loading products: {error}</p>
          <p className="text-gray-600 mt-2">Showing sample products instead</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 sm:px-8">
        {/* Previous Button */}
        {products.length > itemsPerSlide && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-30 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}

        {/* Next Button */}
        {products.length > itemsPerSlide && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-30 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}

        {/* Products Carousel */}
        <div className="overflow-hidden px-8 sm:px-12">
          <div className="flex space-x-6 transition-all duration-500 ease-in-out">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {products.length > itemsPerSlide && (
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-green-600 to-green-700 rounded-full'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {products.length > itemsPerSlide && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {currentIndex + 1} of {totalSlides}
            </p>
          </div>
        )}
      </div>

      {/* View All Products Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View All Products
          <ArrowRight className="inline-block ml-2 w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

export default MostPopularProducts