'use client'

import React, { useState } from 'react';
import { ChevronDown, User, ShoppingCart, Search, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from './Header/TopBar';
import MainHeader from './Header/MainHeader';
import NavLinks from './Header/NavLinks';
import TestNav from './Header/TestNav';

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




  

  return (
    <header className="bg-white">
      <TopBar />
      <MainHeader />
      <NavLinks />
      {/* <TestNav /> */}

      {/* Navigation */}
      {/* <nav className="border-t border-gray-200 border-b py-2">
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
              </div>
            ))}
          </div>
        </div>
      </nav> */}
    </header>
  )
}
