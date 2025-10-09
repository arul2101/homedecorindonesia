"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Eye,
  Handbag,
  ShoppingCart,
  Heart,
  Share2
} from "lucide-react";

function HoverButton({ children, label, onClick, isActive, size = "default" }) {
  const [hoveredButton, setHoveredButton] = useState(null);

  const sizeClasses = {
    default: "p-2",
    small: "p-1.5"
  };

  const iconSizes = {
    default: 18,
    small: 16
  };

  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full ${sizeClasses[size]} shadow-md overflow-hidden transition-colors duration-300 ${
        isActive ? "bg-black text-white" : hoveredButton === label ? "bg-black text-white" : "bg-white text-black"
      }`}
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      aria-label={label}
    >
      {hoveredButton === label && (
        <motion.span
          initial={{ width: 0, opacity: 0, x: -20 }}
          animate={{ width: "auto", opacity: 1, x: 0 }}
          exit={{ width: 0, opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="whitespace-nowrap text-sm"
        >
          {label}
        </motion.span>
      )}
      {children}
    </motion.button>
  );
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onAddToCompare,
  onQuickView,
  onAddToCart,
  onAddToWishlist,
  onShare,
  isInCompare = false,
  isWishlisted = false,
  showActions = true,
  showWishlist = false,
  showShare = false,
  className = ""
}) {
  const [hover, setHover] = useState(false);
  const [localWishlist, setLocalWishlist] = useState(isWishlisted);

  // Handle product images
  const mainImg = product.images?.[0]?.src;
  const secondImg = product.images?.[1]?.src || mainImg;
  const hasMultipleImages = product.images?.length > 1;

  // Format price
  const formatPrice = (price) => {
    return price ? `Rp ${Number(price).toLocaleString("id-ID")}` : "Rp 0";
  };

  // Handle button actions
  const handleCompare = () => {
    onAddToCompare?.(product);
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleWishlist = () => {
    setLocalWishlist(!localWishlist);
    onAddToWishlist?.(product, !localWishlist);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description?.substring(0, 100),
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    onShare?.(product);
  };

  // List view component
  if (viewMode === "list") {
    return (
      <motion.div
        className={`bg-white border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${className}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-48 h-48 bg-white flex items-center justify-center overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              {mainImg && (
                <motion.div
                  key={hover && hasMultipleImages ? product.images?.[1]?.id : product.images?.[0]?.id}
                  initial={{ opacity: .5 }}
                  animate={{ scale: hover ? 1.05 : 1, opacity: 1 }}
                  exit={{ opacity: .5 }}
                  transition={{ duration: .3, ease: "easeOut" }}
                >
                  <Image
                    src={hover && hasMultipleImages ? secondImg : mainImg}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full transition-all duration-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons for list view */}
            {showActions && hover && (
              <AnimatePresence>
                <motion.div
                  className="absolute top-2 right-2 flex flex-col items-end gap-2 z-10"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  transition={{ duration: .3, ease: "easeOut" }}
                >
                  <HoverButton
                    label="Compare"
                    onClick={handleCompare}
                    isActive={isInCompare}
                    size="small"
                  >
                    <RefreshCw size={14} />
                  </HoverButton>
                  <HoverButton
                    label="Quick view"
                    onClick={handleQuickView}
                    size="small"
                  >
                    <Eye size={15} />
                  </HoverButton>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium leading-tight mb-2 font-[Futura]">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description || 'Premium quality product with excellent craftsmanship and design.'}
              </p>

              {/* Product details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {product.sku && (
                  <div>
                    <span className="font-medium">SKU:</span> {product.sku}
                  </div>
                )}
                <div>
                  <span className="font-medium">Stock:</span>{' '}
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price and actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center text-lg">
                {product.salePrice && product.salePrice < product.regularPrice ? (
                  <>
                    <span className="line-through text-gray-400">
                      {formatPrice(product.regularPrice)}
                    </span>
                    <span className="text-black font-medium">
                      {formatPrice(product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-black font-medium">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                {showWishlist && (
                  <button
                    onClick={handleWishlist}
                    className={`p-2 border rounded-lg hover:bg-gray-50 transition-colors ${
                      localWishlist ? "bg-red-50 border-red-200 text-red-500" : "border-gray-300"
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={localWishlist ? "currentColor" : "none"} />
                  </button>
                )}

                {showShare && (
                  <button
                    onClick={handleShare}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view component
  return (
    <motion.div
      className={`p-4 cursor-pointer ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-72 bg-white flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {mainImg && (
            <motion.div
              key={hover && hasMultipleImages ? product.images?.[1]?.id : product.images?.[0]?.id}
              initial={{ opacity: .5 }}
              animate={{ scale: hover ? 1.05 : 1, opacity: 1 }}
              exit={{ opacity: .5 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <Image
                src={hover && hasMultipleImages ? secondImg : mainImg}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-full transition-all duration-300"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Action Buttons */}
        {showActions && hover && (
          <AnimatePresence>
            <motion.div
              className="absolute top-1/4 right-2 flex flex-col items-end gap-2 z-10"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <HoverButton
                label="Compare"
                onClick={handleCompare}
                isActive={isInCompare}
              >
                <RefreshCw size={18} />
              </HoverButton>
              <HoverButton
                label="Quick view"
                onClick={handleQuickView}
              >
                <Eye size={19} />
              </HoverButton>
              <HoverButton
                label="Add to cart"
                onClick={handleAddToCart}
              >
                <Handbag size={18} />
              </HoverButton>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Wishlist and Share buttons */}
        {(showWishlist || showShare) && (
          <div className="absolute top-2 left-2 flex gap-2">
            {showWishlist && (
              <button
                onClick={handleWishlist}
                className={`p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors ${
                  localWishlist ? "text-red-500" : "text-gray-600"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} fill={localWishlist ? "currentColor" : "none"} />
              </button>
            )}
            {showShare && (
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors text-gray-600"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            )}
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-sm font-medium leading-tight mb-2 line-clamp-2 font-[Futura]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap gap-2 items-center text-base">
          {product.salePrice && product.salePrice < product.regularPrice ? (
            <>
              <span className="line-through text-gray-400">
                {formatPrice(product.regularPrice)}
              </span>
              <span className="text-black font-medium">
                {formatPrice(product.salePrice)}
              </span>
            </>
          ) : (
            <span className="text-black font-medium">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}