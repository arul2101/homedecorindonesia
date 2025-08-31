'use client'

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput(){
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      setTimeout(() => {
        const input = document.querySelector('#search-input');
        if (input) input.focus();
      }, 150);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="p-2 text-black hover:text-gray-700 transition-colors"
        aria-label="Search"
      >
        <Search className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 ${
          isSearchOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSearchOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
          isSearchOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-xl mx-auto px-4 py-8">
          <div className="absolute right-5 top-5">
            <button
              onClick={() => setIsSearchOpen(false)}
              className=""
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products.."
                className="w-full font-light py-2 pr-12 border-b border-gray-400 focus:font-normal focus:border-black focus:outline-none bg-transparent placeholder-black"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                aria-label="Submit search"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};