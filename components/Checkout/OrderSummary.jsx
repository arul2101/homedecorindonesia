"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Truck, Shield, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

const OrderSummary = ({ items, totals, shippingCost, totalAmount }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [expandedItems, setExpandedItems] = useState(new Set());

  const formatPrice = (price) => {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const toggleItemExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-sm border overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h2 className="text-lg font-medium">Order Summary</h2>
        <p className="text-sm text-gray-600">{totals.itemCount} items</p>
      </div>

      {/* Items */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.id}-${JSON.stringify(item.attributes)}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b last:border-b-0"
            >
              <div className="p-4">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.images?.[0]?.src ? (
                      <Image
                        src={item.images[0].src}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-1">
                      {item.sale_price && item.sale_price < (item.regular_price || item.price) ? (
                        <>
                          <span className="text-sm font-medium text-black">
                            {formatPrice(item.sale_price)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(item.regular_price || item.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-black">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* SKU */}
                    {item.sku && item.sku !== "N/A" && (
                      <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.attributes)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 py-1 text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.attributes)}
                          className="p-1 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.attributes)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatPrice((item.sale_price || item.price) * item.quantity)}
                    </p>
                  </div>
                </div>

                {/* Attributes (if any) */}
                {item.attributes && Object.keys(item.attributes).length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <button
                      onClick={() => toggleItemExpanded(`${item.id}-${JSON.stringify(item.attributes)}`)}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {expandedItems.has(`${item.id}-${JSON.stringify(item.attributes)}`) ? 'Hide' : 'Show'} details
                    </button>

                    <AnimatePresence>
                      {expandedItems.has(`${item.id}-${JSON.stringify(item.attributes)}`) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-xs text-gray-600 space-y-1"
                        >
                          {Object.entries(item.attributes).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium capitalize">{key}:</span> {value}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Totals */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="space-y-2">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span>
              {shippingCost === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                formatPrice(shippingCost)
              )}
            </span>
          </div>

          {/* Free Shipping Notice */}
          {totals.subtotal < 500000 && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
              🎁 Add Rp {(500000 - totals.subtotal).toLocaleString("id-ID")} more for free shipping!
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between pt-2 border-t font-medium">
            <span>Total</span>
            <span className="text-lg">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-6 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield size={16} className="text-green-600" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck size={16} className="text-blue-600" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw size={16} className="text-purple-600" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-6 pb-6">
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
            <button
              type="button"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;