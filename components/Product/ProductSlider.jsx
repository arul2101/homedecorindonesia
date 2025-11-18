"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCart } from "@/hooks/useCart";

export default function ProductSlider({
  products = [],
  title = "Recommended Products",
  subtitle = "",
  autoplay = false,
  autoplayInterval = 4000,
  showArrows = true,
  showDots = true,
  slidesToShow = 4,
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [slidesPerView, setSlidesPerView] = useState(slidesToShow);
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Cart functionality
  const { addToCart } = useCart();

  // Product action handlers
  const handleQuickView = (product) => {
    console.log('Quick view:', product.name);
    // You can emit an event or use a modal here
    window.dispatchEvent(new CustomEvent('openQuickView', {
      detail: product
    }));
  };

  const handleAddToCart = (product) => {
    const success = addToCart(product, 1);
    if (success) {
      // Show success feedback
      window.dispatchEvent(new CustomEvent('addToCart', {
        detail: { product, quantity: 1 }
      }));
      console.log(`Added ${product.name} to cart`);
    }
  };

  const handleProductClick = (product) => {
    console.log('Product clicked:', product.name);
    // Navigate to product detail page
    if (product.slug) {
      window.location.href = `/products/${product.slug}`;
    }
  };

  // Responsive breakpoints
  const getResponsiveSlides = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 768) return 2; // sm
    if (width < 1024) return 3; // md
    return slidesToShow; // lg and above
  };

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getResponsiveSlides());
      setCurrentIndex(0); // Reset to first slide
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow]);

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying && products.length > slidesPerView) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, products.length - slidesPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoplayInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, products.length, slidesPerView, autoplayInterval]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      goToNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right - previous slide
      goToPrev();
    }
  };

  // Navigation functions
  const goToNext = () => {
    const maxIndex = Math.max(0, products.length - slidesPerView);
    setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };

  const goToPrev = () => {
    const maxIndex = Math.max(0, products.length - slidesPerView);
    setCurrentIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Pause/resume autoplay on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoplay) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoplay) {
      setIsPlaying(true);
    }
  };

  // Calculate slider metrics
  const maxIndex = Math.max(0, products.length - slidesPerView);
  const canSlideNext = currentIndex < maxIndex;
  const canSlidePrev = currentIndex > 0;

  // Debug: Log product data to check price structure
  console.log('=== PRODUCT SLIDER DEBUG ===');
  console.log('Products received:', products);
  console.log('Product count:', products.length);

  if (products.length > 0) {
    console.log('Sample product data:');
    products.slice(0, 2).forEach((product, index) => {
      console.log(`Product ${index + 1}:`, {
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        regularPrice: product.regularPrice,
        sale_price: product.sale_price,  // WooCommerce field
        regular_price: product.regular_price,  // WooCommerce field
        on_sale: product.on_sale
      });
    });
  }
  console.log('=== END PRODUCT SLIDER DEBUG ===');

  // If no products or only one slide needed, don't show slider
  if (!products || products.length === 0) {
    return null;
  }

  if (products.length <= slidesPerView) {
    // Just show products in a grid
    return (
      <section className={`py-12 ${className}`}>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-2">{title}</h2>}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <ProductCard
                product={product}
                viewMode="grid"
                showWishlist={true}
                showShare={false}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Slider Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Products */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex-shrink-0 px-2 ${
                slidesPerView === 1 ? 'w-full' :
                slidesPerView === 2 ? 'w-1/2' :
                slidesPerView === 3 ? 'w-1/3' :
                'w-1/4'
              }`}
            >
              <ProductCard
                product={product}
                viewMode="grid"
                showWishlist={true}
                showShare={false}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={goToPrev}
              disabled={!canSlidePrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                canSlidePrev
                  ? 'hover:bg-white hover:scale-110 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>

            <button
              onClick={goToNext}
              disabled={!canSlideNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                canSlideNext
                  ? 'hover:bg-white hover:scale-110 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              aria-label="Next products"
            >
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </>
        )}

        {/* Progress Indicator */}
        {autoplay && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
              transition={{ duration: autoplayInterval / 1000, ease: 'linear' }}
            />
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-black w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-600">
          {currentIndex + 1} / {maxIndex + 1}
        </span>
      </div>

      {/* Play/Pause Button (for autoplay) */}
      {autoplay && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-4 bg-current"></div>
                  <div className="w-1 h-4 bg-current"></div>
                </div>
                Pause
              </>
            ) : (
              <>
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-current"></div>
                Play
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}