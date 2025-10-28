"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Grid, List, ChevronDown } from "lucide-react";

const ProductsGrid = dynamic(() => import("@/components/ProductsGrid"), { ssr: false });

export default function ProductsPage({ products, category, categoryId }) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      case "latest":
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      case "price-low-high":
        const priceA = parseFloat(a.price || a.sale_price || 0);
        const priceB = parseFloat(b.price || b.sale_price || 0);
        return priceA - priceB;
      case "price-high-low":
        const priceC = parseFloat(a.price || a.sale_price || 0);
        const priceD = parseFloat(b.price || b.sale_price || 0);
        return priceD - priceC;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "latest", label: "Latest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" }
  ];

  // Handle product click for navigation
  const handleProductClick = (product) => {
    if (product?.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">{category}</h1>

      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-6">
          {/* Results Count */}
          <span className="text-sm text-gray-600">
            Showing all {products.length} results
          </span>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm">Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    sortBy === option.value ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!categoryId ? (
        <p className="text-sm text-gray-500">
          Kategori <q>{category}</q> tidak ditemukan.
        </p>
      ) : sortedProducts.length === 0 ? (
        <p className="text-sm text-gray-500">Produk tidak tersedia.</p>
      ) : (
        <ProductsGrid products={sortedProducts} viewMode={viewMode} onProductClick={handleProductClick} />
      )}
    </main>
  )
}
