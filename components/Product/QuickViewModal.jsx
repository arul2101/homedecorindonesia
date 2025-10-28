"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/hooks/useCompare";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Plus,
  Minus,
  Check
} from "lucide-react";

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, onAddToWishlist }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedToCartFeedback, setShowAddedToCartFeedback] = useState(false);

  // Use global compare state
  const { isInCompare, toggleCompare, isCompareFull } = useCompare();
  const isCurrentlyCompared = product ? isInCompare(product.id) : false;

  // Product data (computed values, not hooks)
  const images = product?.images || [];
  const hasMultipleImages = images.length > 1;
  const attributes = product?.attributes || [];
  const averageRating = product?.average_rating || 0;
  const reviewCount = product?.review_count || 0;
  const currentPrice = product?.sale_price || product?.price || 0;
  const originalPrice = product?.regular_price || product?.price || 0;
  const hasDiscount = product?.sale_price && product.sale_price < product.regular_price;

  // All useCallback hooks must be declared before any early returns
  const nextImage = useCallback(() => {
    if (hasMultipleImages && images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [hasMultipleImages, images.length]);

  const prevImage = useCallback(() => {
    if (hasMultipleImages && images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [hasMultipleImages, images.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }, [onClose, prevImage, nextImage]);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;

    setIsAddingToCart(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = onAddToCart?.(product, quantity, selectedAttributes);

    if (success) {
      // Emit event for CartManager to show notification
      window.dispatchEvent(new CustomEvent('addToCart', {
        detail: { product, quantity, attributes: selectedAttributes }
      }));
    }

    setIsAddingToCart(false);
    setShowAddedToCartFeedback(true);

    // Reset feedback after 2 seconds
    setTimeout(() => {
      setShowAddedToCartFeedback(false);
    }, 2000);
  }, [product, quantity, selectedAttributes, onAddToCart]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product, !isWishlisted);
  }, [product, isWishlisted, onAddToWishlist]);

  const handleToggleCompare = useCallback(() => {
    if (!product) return;

    try {
      toggleCompare(product);
    } catch (error) {
      if (error.message.includes('Maximum')) {
        alert('Maximum 4 products can be compared. Please remove a product first.');
      }
    }
  }, [product, toggleCompare]);

  const handleShare = useCallback(() => {
    if (!product) return;

    const cleanDescription = formatDescription(product.short_description) || formatDescription(product.description)?.substring(0, 100) || '';

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: cleanDescription,
        url: window.location.origin + '/product/' + product.slug
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/product/' + product.slug);
    }
  }, [product]);

  const handleAttributeChange = useCallback((attributeName, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }));
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity(prev => Math.min(prev + 1, product?.stock_quantity || 10));
  }, [product?.stock_quantity]);

  const decreaseQuantity = useCallback(() => {
    setQuantity(prev => Math.max(prev - 1, 1));
  }, []);

  // Early return must be after ALL hooks are declared
  if (!product) return null;

  // Derived values that depend on product
  const currentImage = images[selectedImageIndex]?.src || '/placeholder-product.jpg';

  // Format price function
  const formatPrice = (price) => {
    return price ? `Rp ${Number(price).toLocaleString("id-ID")}` : "Rp 0";
  };

  // Strip HTML tags from text, convert HTML entities, and format structured data
  const formatDescription = (text) => {
    if (!text) return '';

    // Create a temporary element to decode HTML entities
    const decodeHtmlEntities = (str) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    };

    // First decode HTML entities
    let decodedText = decodeHtmlEntities(text);

    // Then strip HTML tags
    let cleanText = decodedText.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    // Replace various dashes with regular dashes
    cleanText = cleanText.replace(/[\u2013\u2014\u8211]/g, '–');

    // Clean up multiple spaces and line breaks
    cleanText = cleanText.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n');

    // Format common product specifications
    if (cleanText.toLowerCase().includes('dimensions') ||
        cleanText.toLowerCase().includes('color') ||
        cleanText.toLowerCase().includes('fabric')) {

      let formattedText = cleanText
        .replace(/Additional Information:\s*/i, '\n')
        .replace(/Dimensions:\s*/i, '• Dimensions: ')
        .replace(/Color:\s*/i, '\n• Color: ')
        .replace(/Fabric Name:\s*/i, '\n• Fabric: ')
        .replace(/Material:\s*/i, '\n• Material: ')
        .replace(/Size:\s*/i, '\n• Size: ')
        .replace(/Weight:\s*/i, '\n• Weight: ')
        .replace(/–\s*Length/g, '\n  • Length')
        .replace(/–\s*Depth/g, '\n  • Depth')
        .replace(/–\s*Height/g, '\n  • Height')
        .replace(/–\s*Seat Height/g, '\n  • Seat Height')
        .replace(/–\s*Width/g, '\n  • Width')
        .replace(/–\s*Diameter/g, '\n  • Diameter')
        .trim();

      // Clean up any remaining formatting issues
      formattedText = formattedText.replace(/•\s*•/g, '•').replace(/\n\s*\n/g, '\n');

      return formattedText;
    }

    // If it's very long, truncate it
    if (cleanText.length > 200) {
      return cleanText.substring(0, 200) + '...';
    }

    return cleanText;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-hidden"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="relative h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900">Quick View</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Close quick view"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Image Section */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden group">
                    <Image
                      src={currentImage}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority
                    />

                    {/* Image Navigation */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {hasMultipleImages && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((image, index) => (
                        <button
                          key={image.id || index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            selectedImageIndex === index
                              ? 'border-black scale-105'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details Section */}
                <div className="space-y-6">
                  {/* Title and Rating */}
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(Number(averageRating))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {Number(averageRating).toFixed(1)} ({reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(currentPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-gray-600">
                    <p className="text-sm whitespace-pre-line">
                      {formatDescription(product.short_description) || formatDescription(product.description) ||
                       'Premium quality product with excellent craftsmanship and contemporary design.'}
                    </p>
                  </div>

                  {/* Product Attributes */}
                  {attributes.length > 0 && (
                    <div className="space-y-4">
                      {attributes.map((attribute) => (
                        <div key={attribute.id} className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            {attribute.name}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {attribute.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleAttributeChange(attribute.name, option)}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                                  selectedAttributes[attribute.name] === option
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-16 text-center font-medium">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        disabled={quantity >= (product.stock_quantity || 10)}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.stock_quantity && (
                      <span className="text-sm text-gray-500">
                        ({product.stock_quantity} available)
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || product.stock_status !== 'instock'}
                      className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                      {isAddingToCart ? (
                        <>
                          <RefreshCw size={20} className="animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <div className="flex gap-3">
                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={toggleWishlist}
                        className={`flex-1 py-3 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 font-medium transform hover:scale-105 ${
                          isWishlisted
                            ? 'border-red-500 bg-red-500 text-white shadow-lg'
                            : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                        }`}
                      >
                        <Heart
                          size={20}
                          fill={isWishlisted ? 'currentColor' : 'none'}
                          className={`transition-transform duration-300 ${isWishlisted ? 'scale-110' : 'scale-100'}`}
                        />
                        <span className="transition-colors duration-300">
                          {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                        </span>
                      </button>

                      {/* Compare Toggle Button */}
                      <button
                        onClick={handleToggleCompare}
                        disabled={!product}
                        className={`p-3 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                          isCurrentlyCompared
                            ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                            : isCompareFull
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                        aria-label={
                          isCurrentlyCompared
                            ? 'Remove from compare'
                            : isCompareFull
                            ? 'Compare list is full'
                            : 'Add to compare'
                        }
                      >
                        <RefreshCw
                          size={20}
                          className={`transition-transform duration-300 ${
                            isCurrentlyCompared ? 'scale-110 rotate-180' : 'scale-100'
                          }`}
                        />
                      </button>

                      {/* Share Button (stays single-click) */}
                      <button
                        onClick={handleShare}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                        aria-label="Share product"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Product Features */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck size={18} className="text-gray-400" />
                      <span>Free shipping on orders over Rp 500.000</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield size={18} className="text-gray-400" />
                      <span>2-year warranty included</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <RefreshCw size={18} className="text-gray-400" />
                      <span>30-day return policy</span>
                    </div>
                  </div>

                  {/* SKU */}
                  {product.sku && (
                    <div className="text-sm text-gray-500">
                      SKU: {product.sku}
                    </div>
                  )}
                </div>
              </div>

              {/* Added to Cart Feedback */}
              <AnimatePresence>
                {showAddedToCartFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                  >
                    <Check size={20} />
                    <span className="font-medium">Added to cart!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}