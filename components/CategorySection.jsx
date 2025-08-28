'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      title: 'Sofa & Furniture',
      backgroundImage: '/img/sofa-furniture-bg.jpg', // You'll need to add this image
      href: '/category/sofa-furniture'
    },
    {
      id: 2,
      title: 'Lighting',
      backgroundImage: '/img/lighting-bg.jpg', // You'll need to add this image
      href: '/category/lighting'
    },
    {
      id: 3,
      title: 'Decor Items',
      backgroundImage: '/img/decor-items-bg.jpg', // You'll need to add this image
      href: '/category/decor-items'
    },
    {
      id: 4,
      title: 'Rugs',
      backgroundImage: '/img/rugs-bg.jpg', // You'll need to add this image
      href: '/category/rugs'
    }
  ];

  return (
    <section className="hd-cats">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-gray-600 text-2xl font-light mb-12">
          Shop By Category
        </h2>
        
        <div className="hd-cats__grid">
          {categories.map((category) => (
            <div key={category.id} className="hd-cat" style={{
              backgroundImage: `url(${category.backgroundImage})`
            }}>
              <h3 className="hd-cat__title">{category.title}</h3>
              <a href={category.href} className="hd-cat__btn">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
