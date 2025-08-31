"use client"

import React, { useState } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="">
      <div className="">
        <button
          onClick={openCart}
          className="p-2 text-black hover:text-gray-700 transition-colors relative"
        >
          <HiOutlineShoppingBag className="h-6 w-6" />
          <span className="absolute top-1 right-0 bg-[#9aab88] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </button>
      </div>

      <SlidePanel isOpen={isCartOpen} onClose={closeCart}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h2 className="text-xl font-normal text-gray-800 tracking-wider">
              SHOPPING CART
            </h2>
            <button
              onClick={closeCart}
              className="flex items-center group"
            >
              <span className="text-sm">CLOSE</span>
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <p className="text-lg">No products in the cart.</p>
              </div>
            ) : (
              <div className="w-full">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
                    {/* Isi Cart */}
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
                Checkout
              </button>
            </div>
          )}
        </div>
      </SlidePanel>
    </div>
  );
};