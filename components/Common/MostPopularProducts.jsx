'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, ShoppingCart, Eye, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'

const MostPopularProducts = ({
  title = "Most Popular Products",
  subtitle = "Discover our best-selling furniture pieces loved by our customers",
  className = '',
  showWishlist = true,
  showQuickView = true,
  showRating = true,
  apiEndpoint = '/api/products/popular-products',
  itemsPerSlide = 4,
  autoPlay = true,
  autoPlayInterval = 5000,
  variant = 'carousel'
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wishlistItems, setWishlistItems] = useState(new Set())
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

        const result = await response.json()
        
        if (result.success && result.data) {
          const transformedProducts = transformWooCommerceProducts(result.data)
          setProducts(transformedProducts.slice(0, 12))
        } else {
          throw new Error(result.error || 'Failed to fetch products')
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)
        setProducts(getSampleProducts())
      }
    }

    fetchProducts()
  }, [apiEndpoint])

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

  const extractFeaturesFromProduct = (product) => {
    const features = []
    if (product.attributes) {
      product.attributes.forEach(attr => {
        if (attr.name && attr.options?.length > 0) {
          features.push(`${attr.name}: ${attr.options[0]}`)
        }
      })
    }
    if (features.length === 0) {
      features.push('Premium Quality', 'Modern Design', 'Comfortable')
    }
    return features.slice(0, 3)
  }

  const isNewProduct = (dateCreated) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const createdDate = new Date(dateCreated)
    return createdDate > thirtyDaysAgo
  }

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

  const ProductCard = ({ product, index }) => {
    const isWishlisted = wishlistItems.has(product.id)
    const isHovered = hoveredProduct === product.id

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ y: -12 }}
        className="group relative"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex-shrink-0 w-80 border border-gray-100 relative">
          
          {/* Animated gradient border effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #10b981)',
              backgroundSize: '300% 300%',
              padding: '2px',
              zIndex: -1
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          {/* Product Image Container */}
          <div className="relative h-80 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
            {product.image && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                  quality={90}
                />
              </motion.div>
            )}

            {/* Animated overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.8 }}
            />

            {/* Badges Container */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
              <div className="flex flex-col gap-2">
                {product.discount && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.2 
                    }}
                    className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    -{product.discount}%
                  </motion.div>
                )}
                {product.isNew && (
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.3 
                    }}
                    className="bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm"
                  >
                    NEW
                  </motion.div>
                )}
              </div>

              {/* Wishlist Button */}
              {showWishlist && (
                <motion.button
                  whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl ${
                    isWishlisted
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              )}
            </div>

            {/* Action Buttons */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 flex gap-3 z-20"
                >
                  {showQuickView && (
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white/95 backdrop-blur-md text-gray-900 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:bg-white transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      Quick View
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full"
              >
                {product.category}
              </motion.span>
              
              {showRating && product.rating && (
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    ({product.reviews})
                  </span>
                </div>
              )}
            </div>

            {/* Product Name */}
            <Link href={product.url || '#'}>
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight hover:text-emerald-600 transition-colors cursor-pointer"
              >
                {product.name}
              </motion.h3>
            </Link>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {product.description.replace(/<[^>]*>/g, '')}
              </p>
            )}

            {/* Price */}
            <div className="flex items-end gap-3">
              {product.originalPrice ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
                  >
                    {formatPrice(product.price)}
                  </motion.span>
                  <span className="text-sm text-gray-500 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                </>
              ) : (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {formatPrice(product.price || 0)}
                </motion.span>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium border border-gray-300 hover:border-emerald-500 transition-all cursor-default"
                  >
                    {feature.split(':')[0]}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerSlide)
  const totalSlides = Math.max(1, products.length - itemsPerSlide + 1)

  if (loading) {
    return (
      <div className={`${className} py-20`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-600 text-lg font-medium"
          >
            Loading amazing products...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
            Featured Collection
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative px-4 sm:px-8">
        {/* Navigation Buttons */}
        {products.length > itemsPerSlide && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 bg-white rounded-full p-4 shadow-2xl hover:shadow-emerald-200 transition-all duration-300 border-2 border-gray-100 hover:border-emerald-500"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 bg-white rounded-full p-4 shadow-2xl hover:shadow-emerald-200 transition-all duration-300 border-2 border-gray-100 hover:border-emerald-500"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </>
        )}

        {/* Products */}
        <div className="overflow-hidden px-8 sm:px-12">
          <motion.div 
            className="flex gap-8"
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Indicators */}
        {products.length > itemsPerSlide && (
          <div className="flex justify-center gap-3 mt-12">
            {[...Array(totalSlides)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-emerald-600 to-blue-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* View All Button */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-5 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explore All Products
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </span>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div> */}
    </div>
  )
}

export default MostPopularProducts