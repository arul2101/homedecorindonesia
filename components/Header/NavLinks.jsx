'use client'

import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { navlinks } from "@/constant";

export default function NavLinks() {
  const [menuItems, setMenuItems] = useState(navlinks); // Start with static navlinks as fallback
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/menu`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Transform WordPress menu data to match our format
        const transformedMenu = transformWordPressMenu(data);
        if (transformedMenu && transformedMenu.length > 0) {
          setMenuItems(transformedMenu);
        }
      } catch (error) {
        console.error('Error loading menu:', error);
        // Keep using static navlinks on error
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  // Function to transform WordPress menu data to our format
  function transformWordPressMenu(wpMenu) {
    // Check if wpMenu is the menu object from the API
    if (!wpMenu || !wpMenu.items) return navlinks;
    
    // Transform the menu items
    function transformMenuItem(item) {
      return {
        name: item.title,
        href: item.url.replace('https://homedecorindonesia.com', ''),
        hasDropdown: item.child_items?.length > 0,
        sublinks: item.child_items?.map(child => ({
          name: child.title,
          href: child.url.replace('https://homedecorindonesia.com', ''),
          hasDropdown: child.child_items?.length > 0,
          sublinks: child.child_items?.map(grandChild => ({
            name: grandChild.title,
            href: grandChild.url.replace('https://homedecorindonesia.com', '')
          }))
        }))
      };
    }
    
    return wpMenu.items.map(transformMenuItem);
  }

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
    <div className="border-t border-gray-200 border-b py-2 sm:block hidden">
      <div className="px-4">
        <nav className="flex items-center gap-4 flex-wrap font-light">
          {navlinks.map(item => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                setHoveredItem(item.name)
              }}
              onMouseLeave={() => {
                setHoveredItem(null)
              }}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-[.8rem] text-gray-700 hover:text-gray-900 font-normal text-sm transition-colors duration-200 relative"
              >
                <span>{item.name}</span>

                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${hoveredItem === item.name ? 'rotate-180' : ''}`} 
                  />
                )}
                <m.span
                  className="absolute bottom-0 left-0 h-[.7px] bg-gray-800 origin-left w-[80%]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                  transition={{ duration: .2, ease: "easeOut" }}
                />
              </Link>

              <AnimatePresence>
                {item.hasDropdown && hoveredItem === item.name && (
                  <m.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-xl z-50 min-w-48 p-2"
                  >
                    <div className="p-2">
                      {item.sublinks.map((category) => (
                        <div
                          key={category.name}
                          className="relative mb-3 last:mb-0"
                          onMouseEnter={() => {
                            if (category.hasDropdown) {
                              setHoveredCategory(category.name)
                            }

                            setIsHovered(category.name)
                          }}
                          onMouseLeave={() => {
                            setHoveredCategory(null)
                            setIsHovered(null)
                          }}
                        >
                          <Link href={category.href} className={`${category.hasDropdown && 'flex justify-between items-center'} text-sm rounded transition-colors duration-150 py-2 px-3 block`}>
                            <span className="relative">
                              {category.name}

                              <m.span
                                className="absolute bottom-0 left-0 h-[1px] bg-gray-800 origin-left w-[100%]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered === category.name ? 1 : 0 }}
                                transition={{ duration: .2, ease: "easeOut" }}
                              />
                            </span>

                            {category.hasDropdown && <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isHovered === category.name ? 'rotate-90' : ''}`} />}
                          </Link>

                          <AnimatePresence>
                            {category.hasDropdown && hoveredCategory === category.name && (
                              <m.div
                                variants={subDropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute top-0 left-full ml-1 bg-white border border-gray-200 shadow-xl z-60 min-w-56"
                              >
                                <div className="p-3">
                                  <ul className="space-y-3">
                                    {category.sublinks.map((subItem, subIndex) => (
                                      <m.li
                                        key={subItem.name}
                                        custom={subIndex}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                      >
                                        <Link href={subItem.href} className="block text-sm rounded transition-colors duration-150 relative py-2 px-3" onMouseEnter={() => setHoveredSubCategory(subItem.name)}
                                        onMouseLeave={() => setHoveredSubCategory(null)}>
                                          {subItem.name}
                                        
                                          <m.span
                                            className="absolute bottom-0 left-0 h-[1px] bg-gray-800 origin-left w-[100%]"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: hoveredSubCategory === subItem.name ? 1 : 0 }}
                                            transition={{ duration: .2, ease: "easeOut" }}
                                          />
                                        </Link>
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