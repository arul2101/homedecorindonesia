'use client'

import React from 'react'
import InteractiveHotspot from './InteractiveHotspot'

const InteractiveHotspotExample = () => {
  // Example 1: Living Room Furniture Hotspots
  const livingRoomImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/SnapInsta.to_506076833_1371193378346484_1638906915380293301_n.jpg',
      alt: 'Luxury & Warmth in One Place'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Hadirkan-Sentuhan-Elegan-dan-Nyaman-di-Ruang-Tamu-Anda-✨Dengan-perpaduan-sofa-klasik-meja-denga.jpg',
      alt: 'Perpaduan Sofa Klasik meja kopi, sofa chesterfield, chest drawerst home decor indonesia'
    }
  ]

  const livingRoomHotspots = [
    {
      id: 'duke-sofa-1',
      imageIndex: 0,
      position: { top: '55%', left: '50%' },
      tooltipPosition: { top: '-120px', left: '-70px' },
      title: 'Duke Chesterfield Sofa',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg?height=60&width=60',
      description: 'Dimensions :<br/>– Length 218 cm x Depth 100 cm<br/>– Height 74 cm x Seat Height 46 cm',
      pricing: {
        original: 'Rp 25,141,500',
        sale: 'Rp 21,998,813'
      },
      url: 'https://www.homedecorindonesia.com/product/duke-chesterfield-sofa-cfb-01/'
    },
    {
      id: 'livorno-chair',
      imageIndex: 0,
      position: { bottom: '25%', left: '5%' },
      tooltipPosition: { bottom: '120px', left: '0px' },
      position: 'top',
      title: 'Livorno Single 11 Onyx',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/Livorno-Single-11-Onyx.jpg?height=60&width=60',
      description: 'Dimensions :<br/>– Length 72 cm x Depth 83 cm<br/>– Height 108 cm x Seat Height 49 cm',
      price: 'Rp 11,280,375',
      url: 'https://www.homedecorindonesia.com/product/livorno-single-11-onyx/'
    },
    {
      id: 'ellison-table',
      imageIndex: 0,
      position: { top: '70%', left: '50%' },
      tooltipPosition: { top: '50px', left: '-70px' },
      tooltipPosition: 'bottom',
      title: 'Ellison Cocktail Table',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/03/1-105-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 123 x 41 cm',
      pricing: {
        original: 'Rp 39,826,800',
        sale: 'Rp 33,852,780'
      },
      url: 'https://www.homedecorindonesia.com/product/ellison-cocktail-table/'
    },
    {
      id: 'reims-chair',
      imageIndex: 1,
      position: { top: '60%', right: '80%' },
      tooltipPosition: { top: '-80px', right: '-160px' },
      tooltipPosition: 'top',
      title: 'Armchair Reims-02',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/Armchair-Reims-02.jpg?height=60&width=60',
      description: 'Dimensions : 80 × 85 × 92 cm',
      pricing: {
        original: 'Rp 10,930,000',
        sale: 'Rp 7,651,000'
      },
      url: 'https://www.homedecorindonesia.com/product/armchair-reims-02/'
    }
  ]

  // Example 2: Bedroom Furniture Hotspots
  const bedroomImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BED1.jpg',
      alt: 'Modern Bedroom Setup'
    }
  ]

  const bedroomHotspots = [
    {
      id: 'luxury-bed',
      imageIndex: 0,
      position: { top: '40%', left: '50%' },
      tooltipPosition: { top: '-100px', left: '-80px' },
      title: 'Luxury Bed Frame',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BED1.jpg?height=60&width=60',
      description: 'Premium wooden bed frame with upholstered headboard<br/>Available in King and Queen sizes',
      price: 'Rp 18,500,000',
      url: '#'
    },
    {
      id: 'nightstand',
      imageIndex: 0,
      position: { top: '60%', left: '20%' },
      tooltipPosition: { top: '-80px', left: '-60px' },
      title: 'Modern Nightstand',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BEDSIDE-NIGHTSTAND.jpg?height=60&width=60',
      description: 'Dimensions: 50 x 40 x 60 cm<br/>With drawer and storage shelf',
      price: 'Rp 3,250,000',
      url: '#'
    }
  ]

  // Example 3: Kitchen Hotspots with Custom Styling
  const kitchenImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-DINING-TABLE.jpg',
      alt: 'Modern Dining Setup'
    }
  ]

  const kitchenHotspots = [
    {
      id: 'dining-table',
      imageIndex: 0,
      position: { top: '50%', left: '50%' },
      tooltipPosition: { top: '-90px', left: '-70px' },
      title: 'Modern Dining Table',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-DINING-TABLE.jpg?height=60&width=60',
      description: 'Seats 6 people comfortably<br/>Solid wood construction',
      pricing: {
        original: 'Rp 15,000,000',
        sale: 'Rp 12,750,000'
      },
      url: '#'
    }
  ]

  return (
    <div className="space-y-16 py-8">
      {/* Section 1: Living Room */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Interactive Living Room Showcase
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Hover over the hotspots to explore our premium living room furniture collection
        </p>
        <InteractiveHotspot
          images={livingRoomImages}
          hotspots={livingRoomHotspots}
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </section>

      {/* Section 2: Bedroom */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Bedroom Furniture Collection
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Discover our comfortable and stylish bedroom furniture pieces
        </p>
        <InteractiveHotspot
          images={bedroomImages}
          hotspots={bedroomHotspots}
          hotspotColor="#8b5cf6"
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </section>

      {/* Section 3: Custom Styled Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Dining Room Elegance
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Premium dining furniture for memorable family gatherings
        </p>
        <InteractiveHotspot
          images={kitchenImages}
          hotspots={kitchenHotspots}
          hotspotColor="#dc2626"
          hotspotSize={28}
          tooltipMinWidth={300}
          gap="30px"
          className="rounded-xl overflow-hidden shadow-xl"
          containerClassName="max-w-4xl mx-auto"
        />
      </section>

      {/* Single Image Example */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Featured Product Highlight
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Click on hotspots to learn more about specific features
        </p>
        <InteractiveHotspot
          images={[
            {
              src: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-SOFA-L.jpg',
              alt: 'Luxury Sectional Sofa'
            }
          ]}
          hotspots={[
            {
              id: 'sectional-sofa',
              imageIndex: 0,
              position: { top: '45%', left: '60%' },
              tooltipPosition: { top: '-80px', left: '-90px' },
              title: 'Premium Sectional Sofa',
              productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-SOFA-L.jpg?height=60&width=60',
              description: 'Modular design<br/>Premium fabric upholstery<br/>Easy configuration',
              price: 'Rp 28,500,000',
              url: '#'
            }
          ]}
          hotspotColor="#059669"
          className="rounded-lg overflow-hidden shadow-lg"
          containerClassName="max-w-3xl mx-auto"
        />
      </section>
    </div>
  )
}

export default InteractiveHotspotExample