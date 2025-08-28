'use client'

import { useEffect, useRef } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const defaultRooms = [
  {
    id: 'bed',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop',
    eyebrow: 'HANDPICKED BY HOME DECOR',
    title: 'Bed Room',
    href: '/furniture-bed-room/bedsets',
  },
  {
    id: 'living',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
    eyebrow: 'HANDPICKED BY HOME DECOR',
    title: 'Living Room',
    href: '#',
  },
  {
    id: 'study',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
    eyebrow: 'SALE UPTO 30% OFF',
    title: 'Study Room',
    href: '#',
  },
  {
    id: 'dining',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop',
    eyebrow: 'SALE UPTO 30% OFF',
    title: 'Dining Room',
    href: '#',
  },
]

function useInViewAnimation(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const cards = Array.from(container.querySelectorAll('.room-card'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
          }
        })
      },
      { threshold: 0.2 }
    )
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}

export default function ShopByRoom({ rooms = defaultRooms }) {
  const ref = useRef(null)
  useInViewAnimation(ref)
  const items = Array.isArray(rooms) && rooms.length ? rooms : defaultRooms

  return (
    <section className="hd-rooms" ref={ref}>
      <div className="hd-rooms__grid">
        {items.map((room, idx) => (
          <div
            key={room.id}
            className={`room-card ${idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}`}
          >
            <a className="room-card__image" href={room.href || '#'} style={{ backgroundImage: `url(${room.image})` }} />

            <div className="room-card__meta">
              <div className="room-card__texts">
                <div className="room-card__eyebrow">{room.eyebrow}</div>
                <div className="room-card__title">{room.title}</div>
              </div>
              <a className="room-card__btn" href={room.href || '#'}>
                Shop Now <FiArrowUpRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
