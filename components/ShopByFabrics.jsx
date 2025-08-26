"use client";

import { useEffect, useRef } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const defaultData = {
  left: {
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1800&auto=format&fit=crop',
    title: 'Drapery Fabric',
    href: '#',
  },
  right: [
    {
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop',
      eyebrow: 'HANDPICKED BY HOME DECOR',
      title: 'Upholstery Fabric',
      href: '#',
    },
    {
      image:
        'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop',
      eyebrow: 'SALE UPTO 30% OFF',
      title: 'Promotional Fabric',
      href: '#',
    },
  ],
}

function useFadeUp(ref) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.classList.add('is-in')
      },
      { threshold: 0.2 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [ref])
}

export default function ShopByFabrics({ data = defaultData }) {
  const leftRef = useRef(null)
  useFadeUp(leftRef)

  const { left, right } = data

  return (
    <section className="hd-fabrics">
      <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-gray-600 text-2xl font-light mb-12">
            Shop By Fabric
          </h2>
        <div className="hd-fabrics__grid">
          {/* Left hero column */}
          <a
            ref={leftRef}
            className="fabric-hero fade-up"
            href={left.href || '#'}
            style={{ backgroundImage: `url(${left.image})` }}
          >
            <div className="fabric-hero__inner">
              <h1 className="fabric-hero__title">{left.title}</h1>
              <span className="fabric-btn">
                Shop Now <FiArrowUpRight />
              </span>
            </div>
          </a>

          {/* Right column with two stacked cards */}
          <div className="fabric-list">
            {right.map((item) => (
              <div className="fabric-card" key={item.title}>
                <a
                  className="fabric-card__image"
                  href={item.href || '#'}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="fabric-card__meta">
                  <div className="fabric-card__texts">
                    <div className="fabric-card__eyebrow">{item.eyebrow}</div>
                    <div className="fabric-card__title">{item.title}</div>
                  </div>
                  <a className="fabric-btn is-light" href={item.href || '#'}>
                    Shop Now <FiArrowUpRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
