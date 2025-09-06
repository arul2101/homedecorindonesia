"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Handbag, RefreshCw } from "lucide-react";


export default function ProductsGrid({ products = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  if (!products || products.length === 0) return null;

  const totalPages = Math.ceil(products.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentProducts = products.slice(startIndex, startIndex + perPage);

  console.log(products)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Grid produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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
    </div>
  );
}

function HoverButton({ children, label }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  return (
    <motion.button 
      className={`flex items-center gap-2 rounded-full p-2 shadow-md overflow-hidden transition-colors duration-300 ${
        hoveredButton === label ? "bg-black text-white" : "bg-white text-black"
      }`}
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
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
  )
}

function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const mainImg = product.images?.[0]?.src;
  const secondImg = product.images?.[1]?.src || mainImg;

  return (
    <motion.div
      className="p-4 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Gambar produk */}
      <div className="relative w-full h-72 bg-white flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {mainImg && (
            <motion.div
              key={hover ? product.images?.[1]?.id : product.images?.[0]?.id}
              initial={{ opacity: .5 }}
              animate={{ scale: hover ? 1.05 : 1, opacity: 1 }}
              exit={{ opacity: .5 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <Image
                src={hover ? secondImg : mainImg}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-full transition-all duration-300"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Tombol hover kanan */}
          {hover && (
            <motion.div
              className="absolute top-1/4 right-2 flex flex-col items-end gap-2 z-10"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: .3, ease: "easeOut" }}
            >
              <HoverButton label="Compare"><RefreshCw size={18} /></HoverButton>
              <HoverButton label="Quick view"><Eye size={19} /></HoverButton>
              <HoverButton label="Add to cart"><Handbag size={18} /></HoverButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info produk */}
      <div className="mt-2">
        <h2 className="text-sm font-medium leading-tight mb-1 line-clamp-2 font-[Futura]">
          {product.name}
        </h2>

        {/* Harga */}
        <div className="flex flex-wrap gap-2 items-center text-base">
          {product.regular_price && product.sale_price ? (
            <>
              <span className="line-through text-gray-400">
                Rp {Number(product.regular_price).toLocaleString("id-ID")}
              </span>
              <span className="text-black font-medium">
                Rp {Number(product.sale_price).toLocaleString("id-ID")}
              </span>
            </>
          ) : (
            <span className="text-black font-medium">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
