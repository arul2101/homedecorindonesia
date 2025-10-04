'use client'

import Link from 'next/link'
import Image from 'next/image'
import ShopBySection from '@/components/Common/ShopBySection'

export default function RugsPage() {
  // Data for shop by sections
  const shopByShapeItems = [
    {
      id: 'rectangle',
      name: 'Rectangle',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-RECTANGLE.jpg.webp',
      href: '/rugs/rectangle'
    },
    {
      id: 'round',
      name: 'Round',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-ROUND.jpg.webp',
      href: '/rugs/round'
    }
  ]

  const shopByColorItems = [
    { id: 'red', name: 'Red', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-RED.jpg.webp', href: '/rugs/color/red' },
    { id: 'pink', name: 'Pink', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-PINK.jpg.webp', href: '/rugs/color/pink' },
    { id: 'grey', name: 'Grey', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-GREY.jpg.webp', href: '/rugs/color/grey' },
    { id: 'black', name: 'Black', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/4.-BLACK.jpg.webp', href: '/rugs/color/black' },
    { id: 'yellow', name: 'Yellow', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-YELLOW.jpg.webp', href: '/rugs/color/yellow' },
    { id: 'blue', name: 'Blue', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/6.-BLUE.jpg.webp', href: '/rugs/color/blue' },
    { id: 'green', name: 'Green', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/7.-GREEN.jpg.webp', href: '/rugs/color/green' },
    { id: 'cream', name: 'Cream', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/8.-CREAM.jpg.webp', href: '/rugs/color/cream' },
    { id: 'all-colors', name: 'All Colors', image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/9.-ALL-COLORS.jpg.webp', href: '/rugs/color/all-colors' }
  ]

  const shopByStyleItems = [
    {
      id: 'neutral-rugs',
      name: 'Neutral Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-NATURAL-RUGS.jpg.webp',
      href: '/rugs/style/neutral-rugs',
      description: 'Earthy tones and organic textures'
    },
    {
      id: 'geometric-rugs',
      name: 'Geometric Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-GEOMETRIC-RUGS.jpg.webp',
      href: '/rugs/style/geometric-rugs',
      description: 'Bold patterns and shapes'
    },
    {
      id: 'classical-rugs',
      name: 'Classical Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-CLASSICAL-RUGS.jpg.webp',
      href: '/rugs/style/classical-rugs',
      description: 'Classic patterns and timeless elegance'
    },
    {
      id: 'art-deco-rugs',
      name: 'Art Deco Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-ART-DECO-RUGS.jpg.webp',
      href: '/rugs/style/art-deco-rugs',
      description: 'Glamorous and luxurious designs'
    },
    {
      id: 'abstract-rugs',
      name: 'Abstract Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/4.-ABSTRACT-RUGS.jpg.webp',
      href: '/rugs/style/abstract-rugs',
      description: 'Artistic and unconventional designs'
    },
    {
      id: 'plain-rugs',
      name: 'Plain Rugs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-PLAIN-RUGS.jpg.webp',
      href: '/rugs/style/plain-rugs',
      description: 'Simple and understated designs'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="https://www.homedecorindonesia.com/wp-content/uploads/2025/05/4.-KARPET.jpg"
          alt="Rugs Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-8xl font-extralight tracking-wider mb-4">
            RUGS
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-center max-w-2xl">
            Transform your space with our curated collection of premium rugs
          </p>
        </div>
      </section>

      {/* Shop by Shape */}
      <ShopBySection
        title="SHOP BY SHAPE"
        items={shopByShapeItems}
      />

      {/* Shop by Color */}
      <ShopBySection
        title="SHOP BY COLOR"
        items={shopByColorItems}
        backgroundColor="bg-gray-50"
      />

      {/* Shop by Style */}
      <ShopBySection
        title="SHOP BY STYLE"
        items={shopByStyleItems}
        showDescription={true}
      />
    </div>
  )
}