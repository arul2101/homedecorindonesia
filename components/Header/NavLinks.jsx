'use client'

import { navlinks } from "@/constant"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

export default function NavLinks() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    if(navlinks[index].hasDropdown) {
      setActiveDropdown(index)
    }
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const data = navlinks[activeDropdown];

  return (
    <nav className="border-t border-gray-200 border-b py-2">
      <div className="px-4">
        <div className="flex items-center gap-4 flex-wrap group">
          {navlinks.map((link, index) => (
            <div key={index}>
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap text-sm font-medium">
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 md:block hidden group-hover:rotate-180" />
                  )}
                </Link>

                {link.hasDropdown && (
                  <div className="absolute top-8 group-hover:md:block hover:md:block hidden z-[9999]">
                    <div className="bg-white shadow-md rounded-md border-gray-200 p-3.5">
                      {link.sublinks?.map((subItem, subIndex) => (
                        <Link key={subIndex} href={subItem.href}>
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* {data && (
                  <div className="absolute top-8 left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]">
                    <div
                      className="py-2"
                      onMouseEnter={() => {}}
                      onMouseLeave={() => {}}
                    >
                      {link.sublinks?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {navlinks.map((link, index) => (
        <Link href={link.href}>

        </Link>
      ))} */}
    </nav>
  )
}
