"use client"

import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/hooks/useCart";
import MiniCart from "../Cart/MiniCart";

const CloseIcon = () => {
  return (
    <div className="relative w-6 cursor-pointer group">
      <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:rotate-0 transition-all duration-300 ease-in-out origin-center"></div>
      
      <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:rotate-0 transition-all duration-300 ease-in-out origin-center"></div>
    </div>
  );
};


const SlidePanel = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full md:w-[22rem] w-[18rem] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default function ShoppingCart(){
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { cartItems, getCartTotals } = useCart();
  const totals = getCartTotals();
  const totalItems = totals.totalItems;

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const openMiniCart = () => setShowMiniCart(true);
  const closeMiniCart = () => setShowMiniCart(false);

  return (
    <div className="relative">
      <button
        onClick={openMiniCart}
        className="p-2 text-black hover:text-gray-700 transition-colors relative group"
      >
        <HiOutlineShoppingBag className="h-6 w-6" />
        {isClient && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Shopping Cart ({isClient ? totalItems : 0} items)
        </span>
      </button>

      {/* Mini Cart Dropdown */}
      <MiniCart
        items={cartItems}
        isOpen={showMiniCart}
        onClose={closeMiniCart}
        onUpdateQuantity={(itemId, newQuantity, attributes = {}) => {
          // This will be handled by the CartManager
          window.dispatchEvent(new CustomEvent('updateCartQuantity', {
            detail: { itemId, quantity: newQuantity, attributes }
          }));
        }}
        onRemoveItem={(itemId, attributes = {}) => {
          // This will be handled by the CartManager
          window.dispatchEvent(new CustomEvent('removeFromCart', {
            detail: { itemId, attributes }
          }));
        }}
        onCheckout={() => {
          // Show full cart sidebar
          closeMiniCart();
          window.dispatchEvent(new CustomEvent('showCart'));
        }}
      />
    </div>
  );
};