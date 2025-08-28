'use client'

import { navlinks } from "@/constant"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";

export default function NavLinks() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const subDropdownVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.2
      }
    })
  };

  return (
    <div className="border-t border-gray-200 border-b py-2">
      <div className="px-4">
        <nav className="flex items-center gap-4 flex-wrap">
          {navlinks.map(item => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link href={item.href} className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                <span>{item.name}</span>

                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${hoveredItem === item.name ? 'rotate-180' : ''}`} 
                  />
                )}
              </Link>

              <AnimatePresence>
                {item.hasDropdown && hoveredItem === item.name && (
                  <m.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-48"
                  >
                    <div className="p-2">
                      {item.sublinks.map((category) => (
                        <div
                          key={category.name}
                          className="relative"
                          onMouseEnter={() => category.hasDropdown && setHoveredCategory(category.name)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <Link href={category.href} className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-150">
                            {category.name}
                          </Link>

                          <AnimatePresence>
                            {category.hasDropdown && hoveredCategory === category.name && (
                              <m.div
                                variants={subDropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute top-0 left-full ml-1 bg-white border border-gray-200 rounded-lg shadow-xl z-60 min-w-56"
                              >
                                <div className="p-3">
                                  <h3 className="font-semibold text-gray-900 text-sm mb-3 border-b border-gray-100 pb-2">{category.name}</h3>

                                  <ul className="space-y-1">
                                    {category.sublinks.map((subItem, subIndex) => (
                                      <m.li
                                        key={subItem.name}
                                        custom={subIndex}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                      >
                                        <Link
                                          href={subItem.href}
                                          className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1.5 rounded transition-colors duration-150"
                                        >{subItem.name}</Link>
                                      </m.li>
                                    ))}
                                  </ul>
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
