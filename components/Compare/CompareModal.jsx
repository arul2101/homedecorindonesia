"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Heart,
  ArrowUpDown,
  Check,
  X as XIcon,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus
} from "lucide-react";

export default function CompareModal({ products, isOpen, onClose, onAddToCart, onRemoveFromCompare, onClearCompare }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!products || products.length === 0) return null;

  // Product categories for comparison
  const getComparisonCategories = () => {
    const categories = [];

    // Basic info
    categories.push({
      id: 'basic',
      name: 'Basic Information',
      items: [
        { key: 'name', label: 'Product Name', type: 'text' },
        { key: 'price', label: 'Price', type: 'price' },
        { key: 'rating', label: 'Rating', type: 'rating' },
        { key: 'stock', label: 'Availability', type: 'availability' }
      ]
    });

    // Specifications
    categories.push({
      id: 'specs',
      name: 'Specifications',
      items: [
        { key: 'dimensions', label: 'Dimensions', type: 'text' },
        { key: 'material', label: 'Material', type: 'text' },
        { key: 'color', label: 'Color', type: 'text' },
        { key: 'weight', label: 'Weight', type: 'text' }
      ]
    });

    // Features
    categories.push({
      id: 'features',
      name: 'Features',
      items: [
        { key: 'warranty', label: 'Warranty', type: 'text' },
        { key: 'shipping', label: 'Shipping', type: 'boolean' },
        { key: 'assembly', label: 'Assembly Required', type: 'boolean' },
        { key: 'return_policy', label: 'Return Policy', type: 'text' }
      ]
    });

    return categories;
  };

  // Get product value for comparison
  const getProductValue = (product, key, type) => {
    if (!product) return 'N/A';

    try {
      switch (key) {
        case 'name':
          return product.name || 'N/A';
        case 'price':
          return Number(product.sale_price || product.price || 0);
        case 'rating':
          return {
            rating: Number(product.average_rating) || 0,
            count: Number(product.review_count) || 0
          };
        case 'stock':
          return product.stock_status === 'instock';
        case 'dimensions':
          // Extract dimensions from description or attributes
          const desc = product.description || '';
          const dimensionsMatch = desc.match(/Dimensions:\s*([^,\n]+)/i);
          return dimensionsMatch ? dimensionsMatch[1].trim() : 'N/A';
        case 'material':
          return 'Premium Materials'; // Placeholder - would come from product attributes
        case 'color':
          return 'Multiple Colors'; // Placeholder - would come from product attributes
        case 'weight':
          return 'Varies'; // Placeholder - would come from product attributes
        case 'warranty':
          return '2 Years';
        case 'shipping':
          return true; // Free shipping
        case 'assembly':
          return Math.random() > 0.5; // Random for demo
        case 'return_policy':
          return '30 Days';
        default:
          return product[key] || 'N/A';
      }
    } catch (error) {
      console.error(`Error getting product value for key "${key}":`, error);
      return 'N/A';
    }
  };

  // Render value based on type
  const renderValue = (value, type) => {
    try {
      switch (type) {
        case 'price':
          const price = Number(value) || 0;
          return `Rp ${price.toLocaleString("id-ID")}`;
        case 'rating':
          const ratingValue = Number(value.rating) || 0;
          const reviewCount = Number(value.count) || 0;
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(ratingValue)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {ratingValue.toFixed(1)} ({reviewCount} reviews)
              </span>
            </div>
          );
        case 'availability':
          return value ? (
            <span className="inline-flex items-center gap-1 text-green-600">
              <Check size={16} />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-red-600">
              <XIcon size={16} />
              Out of Stock
            </span>
          );
        case 'boolean':
          return value ? (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={16} className="text-white" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <XIcon size={16} className="text-white" />
            </div>
          );
        default:
          return value || 'N/A';
      }
    } catch (error) {
      console.error(`Error rendering value of type "${type}":`, error);
      return 'Error';
    }
  };

  const categories = getComparisonCategories();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden"
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
              className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <ArrowUpDown size={24} className="text-gray-700" />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Compare Products</h2>
                    <p className="text-sm text-gray-600">
                      {products.length} product{products.length > 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClearCompare}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add More Products Bar */}
              {products.length < 4 && (
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Plus size={20} />
                      <span className="text-sm font-medium">
                        Add up to {4 - products.length} more product{4 - products.length > 1 ? 's' : ''} to compare
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Browse Products
                    </button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 px-6 pt-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === category.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Comparison Table */}
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900 w-48">
                            Feature
                          </th>
                          {products.map((product) => (
                            <th key={product.id} className="p-4 text-center min-w-[200px]">
                              <div className="space-y-3">
                                <div className="relative w-32 h-32 mx-auto bg-gray-50 rounded-lg overflow-hidden">
                                  <Image
                                    src={product.images?.[0]?.src || '/placeholder-product.jpg'}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                  <button
                                    onClick={() => onRemoveFromCompare(product.id)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {product.name}
                                </h3>
                                <div className="text-lg font-bold text-gray-900">
                                  Rp {Number(product.sale_price || product.price || 0).toLocaleString("id-ID")}
                                </div>
                                <button
                                  onClick={() => onAddToCart(product)}
                                  className="w-full py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                                >
                                  <ShoppingCart size={16} />
                                  Add to Cart
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {categories
                          .find(cat => cat.id === activeTab)
                          ?.items.map((item, index) => (
                            <tr key={item.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="p-4 font-medium text-gray-900 border-t border-gray-200">
                                {item.label}
                              </td>
                              {products.map((product) => (
                                <td key={product.id} className="p-4 text-center border-t border-gray-200">
                                  {renderValue(getProductValue(product, item.key, item.type), item.type)}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Benefits Section */}
                {activeTab === 'overview' && (
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold mb-4">Why Choose These Products?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Shield size={20} className="text-green-600" />
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                              <Check size={16} className="text-green-500" />
                              Premium quality materials
                            </li>
                            <li className="flex items-center gap-2">
                              <Check size={16} className="text-green-500" />
                              2-year warranty included
                            </li>
                            <li className="flex items-center gap-2">
                              <Truck size={16} className="text-blue-500" />
                              Free shipping on orders over Rp 500.000
                            </li>
                            <li className="flex items-center gap-2">
                              <RotateCcw size={16} className="text-purple-500" />
                              30-day return policy
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}