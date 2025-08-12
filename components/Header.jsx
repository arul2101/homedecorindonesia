'use client'

import React, { useState } from 'react';
import { ChevronDown, User, ShoppingCart, Search, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Logo from "@/public/img/Logo.png";
import Link from 'next/link';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = [
    { name: 'Furniture', hasDropdown: true },
    {
      name: 'Lighting',
      hasDropdown: true,
      items: [
        {
          name: 'Ceiling Light',
          href: '/product-category/lighting/ceiling-light'
        },
        {
          name: 'Table Lamp',
          href: '/product-category/lamp/table-lamp'
        },
        {
          name: 'Floor Lamp',
          href: '/product-category/lamp/floor-lamp'
        }
      ]
    },
    { name: 'Decoration', hasDropdown: true },
    { name: 'Cushions', hasDropdown: true },
    { name: 'Fabrics', hasDropdown: true },
    { name: 'Rugs', hasDropdown: false },
    { name: 'Curtains', hasDropdown: false },
    { name: 'Upholstery', hasDropdown: false },
    { name: 'Wallpapers', hasDropdown: false },
    { name: 'Flooring', hasDropdown: false },
    { name: 'Catalogues', hasDropdown: false },
    { name: 'Photo Gallery', hasDropdown: false },
    { name: 'Blog', hasDropdown: false },
    { name: 'SALE', hasDropdown: true }
  ];

  const handleMouseEnter = (index) => {
    if(navigationItems[index].hasDropdown) {
      setActiveDropdown(index)
    }
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  

  return (
    <header className="bg-white">
      {/* Top */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+62 81806040506</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </div>
            </div>
            <div className="flex items-center">
              <select className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer">
                <option>English</option>
                <option>Bahasa Indonesia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={Logo}
              alt='Logo Homedecor'
              className='w-[14rem]'
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200 border-b py-2">
        <div className="px-4">
          <div className="flex items-center gap-4 flex-wrap">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap text-sm font-medium">
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-8 left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-999">
                    <div
                      className="py-2"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.items?.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Dropdown indicator */}
                {/* {item.hasDropdown (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
