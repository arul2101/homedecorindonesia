'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const Accordion = ({
  items,
  className = '',
  itemClassName = '',
  titleClassName = '',
  contentClassName = '',
  icon = <ChevronRight className="w-5 h-5" />,
  allowMultiple = true,
  defaultOpenItems = [],
  variant = 'luxurious'
}) => {
  const [openItems, setOpenItems] = useState(defaultOpenItems)

  const toggleItem = (id) => {
    setOpenItems(prev => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      } else {
        return prev.includes(id) ? [] : [id]
      }
    })
  }

  const getVariantClasses = () => {
    const variants = {
      luxurious: {
        container: 'space-y-4',
        item: 'border-b border-gray-200 pb-4',
        title: 'flex items-center justify-between w-full text-left group',
        titleText: 'text-lg text-gray-800 group-hover:text-gray-600 transition-colors',
        content: 'pl-8 text-gray-600 leading-relaxed',
        iconRotation: 90,
        iconColor: 'text-yellow-600'
      },
      default: {
        container: 'border border-gray-200 rounded-lg overflow-hidden',
        item: 'border-b border-gray-200 last:border-b-0',
        title: 'px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200',
        content: 'px-6 py-4 bg-white',
        titleText: 'font-semibold text-gray-900',
        iconRotation: 180,
        iconColor: 'text-gray-600'
      },
      minimal: {
        container: 'space-y-2',
        item: 'border border-gray-200 rounded-lg overflow-hidden',
        title: 'px-4 py-3 bg-white hover:bg-gray-50 transition-colors duration-200',
        content: 'px-4 py-3 bg-white',
        titleText: 'font-medium text-gray-800',
        iconRotation: 180,
        iconColor: 'text-gray-600'
      },
      modern: {
        container: 'space-y-3',
        item: 'bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300',
        title: 'px-6 py-4 hover:bg-gray-50 transition-colors duration-200 rounded-t-xl',
        content: 'px-6 py-4 text-gray-600',
        titleText: 'font-semibold text-gray-900',
        iconRotation: 180,
        iconColor: 'text-gray-600'
      }
    }
    return variants[variant] || variants.luxurious
  }

  const variantClasses = getVariantClasses()

  return (
    <div className={`${variantClasses.container} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id)

        return (
          <motion.div
            key={item.id}
            className={`${variantClasses.item} ${itemClassName}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={variantClasses.title}
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: isOpen ? variantClasses.iconRotation : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-5 h-5 ${isOpen ? variantClasses.iconColor : 'text-black'} mr-3`}>
                    {icon}
                  </div>
                </motion.div>
                <span className={variantClasses.titleText}>
                  {item.title}
                </span>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className={`${variantClasses.content} ${contentClassName}`}>
                    {Array.isArray(item.content) ? (
                      <div className="space-y-4">
                        {item.content.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <>{item.content}</>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default Accordion