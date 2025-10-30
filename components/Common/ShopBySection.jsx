'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ShopBySection({
  title,
  items,
  backgroundColor = 'bg-white',
  titleAlignment = 'text-left',
  gridCols = 'grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6',
  gap = 'gap-4 md:gap-6',
  itemWidth = '',
  imageSize = { width: 150, height: 150 },
  showDescription = false
}) {
  return (
    <section className={`py-12 md:py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`${titleAlignment} mb-12`}>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
            {title}
          </h2>
          <div className="w-24 h-0.5 bg-gray-400"></div>
        </div>

        <div className={gridCols}>
          {items.map((item) => (
            <Link
              key={item.id || item.name}
              href={item.href}
              className={`group flex-shrink-0 ${itemWidth}`}
            >
              <div className="flex flex-col items-center">
                <div className="relative overflow-hidden rounded-lg flex-shrink-0 mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-light tracking-wide text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item.name}
                  </p>
                  {showDescription && item.description && (
                    <p className="text-xs text-gray-500 mt-1 font-light">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}