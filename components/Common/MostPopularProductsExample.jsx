'use client'

import React from 'react'
import MostPopularProducts from './MostPopularProducts'

const MostPopularProductsExample = () => {
  return (
    <div className="space-y-20 py-8">
      {/* Standard Carousel with 4 items per slide */}
      <section>
        <MostPopularProducts
          title="Most Popular Products"
          subtitle="Discover our best-selling furniture pieces loved by our customers"
          apiEndpoint="/api/products/popular"
          itemsPerSlide={4}
          autoPlay={true}
          autoPlayInterval={5000}
          className="max-w-7xl mx-auto"
        />
      </section>

      {/* 3 Items Per Slide */}
      <section>
        <MostPopularProducts
          title="Featured Collection"
          subtitle="Handpicked modern furniture for contemporary homes"
          apiEndpoint="/api/products/popular"
          itemsPerSlide={3}
          autoPlay={false}
          className="max-w-6xl mx-auto"
        />
      </section>

      {/* 2 Items Per Slide for Premium Display */}
      <section>
        <MostPopularProducts
          title="Premium Collection"
          subtitle="Luxury furniture pieces for sophisticated homes"
          apiEndpoint="/api/products/popular"
          itemsPerSlide={2}
          autoPlay={true}
          autoPlayInterval={4000}
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* Single Item Per Slide */}
      <section>
        <MostPopularProducts
          title="Product of the Day"
          subtitle="Today's featured furniture piece with special offer"
          apiEndpoint="/api/products/popular"
          itemsPerSlide={1}
          autoPlay={true}
          autoPlayInterval={3000}
          className="max-w-2xl mx-auto"
        />
      </section>

      {/* Without Auto-play */}
      <section>
        <MostPopularProducts
          title="Browse Our Collection"
          subtitle="Navigate through our curated selection at your own pace"
          apiEndpoint="/api/products/popular"
          itemsPerSlide={3}
          autoPlay={false}
          className="max-w-6xl mx-auto"
        />
      </section>

      {/* Custom API Endpoint Example */}
      <section>
        <MostPopularProducts
          title="Living Room Favorites"
          subtitle="Popular living room furniture selected by our customers"
          apiEndpoint="/api/products/popular?category=living%20room&limit=8"
          itemsPerSlide={3}
          autoPlay={true}
          autoPlayInterval={6000}
          className="max-w-6xl mx-auto"
        />
      </section>
    </div>
  )
}

export default MostPopularProductsExample