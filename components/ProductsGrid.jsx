"use client";

import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { X } from "lucide-react";
import ProductCard from "@/components/Product/ProductCard";

// Global state for compare, quick view, and cart
let globalCompareState = [];
let globalCartState = [];
let globalQuickViewState = null;

const updateGlobalCompare = (callback) => {
  globalCompareState = callback(globalCompareState);
  window.dispatchEvent(new CustomEvent('compareUpdate', { detail: globalCompareState }));
};

const updateGlobalCart = (callback) => {
  globalCartState = callback(globalCartState);
  window.dispatchEvent(new CustomEvent('cartUpdate', { detail: globalCartState }));
};

const updateGlobalQuickView = (product) => {
  globalQuickViewState = product;
  window.dispatchEvent(new CustomEvent('quickViewUpdate', { detail: product }));
};

export default function ProductsGrid({ products = [], viewMode = "grid" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [compareProducts, setCompareProducts] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showQuickViewModal, setShowQuickViewModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const perPage = 12;

  if (!products || products.length === 0) return null;

  const totalPages = Math.ceil(products.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentProducts = products.slice(startIndex, startIndex + perPage);

  // Compare functions
  const addToCompare = (product) => {
    const exists = compareProducts.find(p => p.id === product.id);
    if (exists) {
      setCompareProducts(compareProducts.filter(p => p.id !== product.id));
    } else if (compareProducts.length < 4) {
      setCompareProducts([...compareProducts, product]);
    } else {
      alert('Maximum 4 products can be compared');
    }
  };

  const removeFromCompare = (productId) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareProducts([]);
    setShowCompareModal(false);
  };

  // Quick view functions
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickViewModal(true);
  };

  const closeQuickView = () => {
    setShowQuickViewModal(false);
    setQuickViewProduct(null);
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Compare Bar */}
      {compareProducts.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{compareProducts.length} product(s) selected</span>
              <div className="flex gap-2">
                {compareProducts.map(product => (
                  <div key={product.id} className="relative">
                    <img
                      src={product.images?.[0]?.src}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCompare}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
              >
                Compare Now
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid atau List produk */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCompare={addToCompare}
              onQuickView={openQuickView}
              onAddToCart={addToCart}
              isInCompare={compareProducts.some(p => p.id === product.id)}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCompare={addToCompare}
              onQuickView={openQuickView}
              onAddToCart={addToCart}
              isInCompare={compareProducts.some(p => p.id === product.id)}
              viewMode="list"
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Compare Products</h2>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {compareProducts.map(product => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <img
                        src={product.images?.[0]?.src}
                        alt={product.name}
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                      <div className="text-lg font-semibold mb-4">
                        Rp {Number(product.price || product.sale_price || 0).toLocaleString("id-ID")}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">SKU:</span>
                          <span>{product.sku || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stock:</span>
                          <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(product);
                          setShowCompareModal(false);
                        }}
                        className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickViewModal && quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeQuickView}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Quick View</h2>
                <button
                  onClick={closeQuickView}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={quickViewProduct.images?.[0]?.src}
                      alt={quickViewProduct.name}
                      className="w-full h-96 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{quickViewProduct.name}</h3>
                    <div className="text-2xl font-bold mb-4">
                      Rp {Number(quickViewProduct.price || quickViewProduct.sale_price || 0).toLocaleString("id-ID")}
                    </div>
                    <p className="text-gray-600 mb-6">
                      {quickViewProduct.description || 'Premium quality product with excellent craftsmanship and design.'}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Availability:</span>
                        <span className={quickViewProduct.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {quickViewProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(quickViewProduct);
                          closeQuickView();
                        }}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
