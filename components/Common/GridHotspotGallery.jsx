'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const GridHotspotGallery = ({
  images = [],
  hotspots = [],
  className = '',
  maxGridItems = 7
}) => {
  const [fullscreenImage, setFullscreenImage] = useState('')
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc)
    setIsFullscreenOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = () => {
    setIsFullscreenOpen(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFullscreen()
      }
    }

    if (isFullscreenOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreenOpen])

  const calculateDiscount = (original, sale) => {
    if (!original || !sale) return null
    const originalNum = parseInt(original.replace(/[^\d]/g, ''))
    const saleNum = parseInt(sale.replace(/[^\d]/g, ''))
    if (originalNum && saleNum) {
      return Math.round(((originalNum - saleNum) / originalNum) * 100)
    }
    return null
  }

  const displayImages = images.slice(0, maxGridItems)

  return (
    <>
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
          height: 600px;
        }

        .grid-item {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .grid-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .grid-item:hover img {
          transform: scale(1.1);
        }

        .large-item {
          grid-row: span 2;
        }

        .hotspot {
          position: absolute;
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid #007AFF;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
        }

        .hotspot::after {
          content: '';
          position: absolute;
          width: 50px;
          height: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .hotspot::before {
          content: '';
          width: 10px;
          height: 10px;
          background: #007AFF;
          border-radius: 50%;
          z-index: 1;
        }

        .hotspot:hover {
          transform: scale(1.2);
          background: #007AFF;
          border-color: #007AFF;
          box-shadow: 0 8px 32px rgba(0, 122, 255, 0.5);
        }

        .hotspot:hover::before {
          background: white;
        }

        .tooltip {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          width: 160px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(15px) scale(0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 30;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
        }

        .hotspot:hover .tooltip,
        .tooltip:hover {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .tooltip-image {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
        }

        .tooltip-content {
          padding: 10px;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid rgba(255, 255, 255, 0.95);
          filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
        }

        .product-name {
          font-size: 11px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .product-name a {
          color: inherit;
          text-decoration: none;
        }

        .product-name a:hover {
          color: #007AFF;
        }

        .product-desc {
          font-size: 9px;
          color: #6b7280;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .product-price {
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .product-price a {
          color: inherit;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .product-price a:hover {
          color: #007AFF;
        }

        .original-price {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 9px;
        }

        .sale-price {
          color: #ef4444;
          font-weight: 700;
          font-size: 10px;
        }

        .discount-badge {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 8px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 8px;
          margin-left: auto;
        }

        .single-price {
          color: #1a1a1a;
          font-size: 10px;
        }

        /* Pulse animation for hotspots */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(0, 122, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 122, 255, 0);
          }
        }

        .hotspot {
          animation: pulse 2s infinite;
        }

        .hotspot:hover {
          animation: none;
        }

        /* Fullscreen overlay */
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .fullscreen-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .fullscreen-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .close-button {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        /* Hotspot positioning */
        ${hotspots.map((hotspot, index) => {
          const position = hotspot.position || {}
          const tooltipPosition = hotspot.tooltipPosition || {}
          return `
            .hotspot-${index + 1} {
              ${position.top ? `top: ${position.top};` : ''}
              ${position.bottom ? `bottom: ${position.bottom};` : ''}
              ${position.left ? `left: ${position.left};` : ''}
              ${position.right ? `right: ${position.right};` : ''}
            }

            .hotspot-${index + 1} .tooltip {
              ${tooltipPosition.top ? `top: ${tooltipPosition.top};` : ''}
              ${tooltipPosition.bottom ? `bottom: ${tooltipPosition.bottom};` : ''}
              ${tooltipPosition.left ? `left: ${tooltipPosition.left};` : ''}
              ${tooltipPosition.right ? `right: ${tooltipPosition.right};` : ''}
            }
          `
        }).join('')}

        /* Responsive design */
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(${displayImages.length}, 200px);
            height: auto;
            gap: 12px;
          }

          .large-item {
            grid-row: span 1;
            height: 300px;
          }

          .tooltip {
            width: 140px;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(0.9) !important;
            bottom: auto !important;
            right: auto !important;
          }

          .hotspot:hover .tooltip,
          .tooltip:hover {
            transform: translate(-50%, -50%) scale(1) !important;
          }

          .tooltip::before {
            display: none;
          }

          .hotspot {
            width: 24px;
            height: 24px;
          }

          .hotspot::before {
            width: 8px;
            height: 8px;
          }

          .grid-item {
            min-height: 180px;
          }

          .tooltip-image {
            height: 60px;
          }

          .tooltip-content {
            padding: 8px;
          }

          .product-name {
            font-size: 10px;
          }

          .product-desc {
            font-size: 8px;
            margin-bottom: 6px;
          }

          .product-price {
            font-size: 9px;
          }

          .discount-badge {
            font-size: 7px;
            padding: 2px 4px;
          }

          .close-button {
            top: 20px;
            right: 20px;
            width: 35px;
            height: 35px;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .tooltip {
            width: 130px;
            max-width: 85vw;
          }

          .tooltip-image {
            height: 50px;
          }

          .tooltip-content {
            padding: 6px;
          }

          .product-name {
            font-size: 9px;
          }

          .product-desc {
            font-size: 7px;
          }

          .product-price {
            font-size: 8px;
          }
        }
      `}</style>

      <div className={`grid-container ${className}`}>
        {displayImages.map((image, imageIndex) => {
          const imageHotspots = hotspots.filter(hotspot => hotspot.imageIndex === imageIndex)
          const isLarge = imageIndex === 0

          return (
            <div
              key={imageIndex}
              className={`grid-item ${isLarge ? 'large-item' : ''}`}
              onClick={() => !imageHotspots.length && openFullscreen(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{ pointerEvents: 'none' }}
              />

              {imageHotspots.map((hotspot, hotspotIndex) => {
                const globalIndex = hotspots.indexOf(hotspot)
                const discount = hotspot.pricing ?
                  calculateDiscount(hotspot.pricing.original, hotspot.pricing.sale) : null

                return (
                  <div
                    key={hotspot.id || globalIndex}
                    className={`hotspot hotspot-${globalIndex + 1}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="tooltip">
                      {hotspot.productImage && (
                        <img
                          src={hotspot.productImage}
                          alt={hotspot.title}
                          className="tooltip-image"
                        />
                      )}
                      <div className="tooltip-content">
                        {hotspot.title && (
                          <div className="product-name">
                            {hotspot.url ? (
                              <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                {hotspot.title}
                              </a>
                            ) : (
                              hotspot.title
                            )}
                          </div>
                        )}
                        {hotspot.description && (
                          <div
                            className="product-desc"
                            dangerouslySetInnerHTML={{ __html: hotspot.description }}
                          />
                        )}
                        {hotspot.price && (
                          <div className="product-price">
                            {hotspot.url ? (
                              <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                <span className="single-price">{hotspot.price}</span>
                              </a>
                            ) : (
                              <span className="single-price">{hotspot.price}</span>
                            )}
                          </div>
                        )}
                        {hotspot.pricing && (
                          <div className="product-price">
                            {hotspot.url ? (
                              <a href={hotspot.url} target="_blank" rel="noopener noreferrer">
                                {hotspot.pricing.original && (
                                  <span className="original-price">{hotspot.pricing.original}</span>
                                )}
                                {hotspot.pricing.sale && (
                                  <span className="sale-price">{hotspot.pricing.sale}</span>
                                )}
                                {discount && (
                                  <span className="discount-badge">{discount}% OFF</span>
                                )}
                              </a>
                            ) : (
                              <>
                                {hotspot.pricing.original && (
                                  <span className="original-price">{hotspot.pricing.original}</span>
                                )}
                                {hotspot.pricing.sale && (
                                  <span className="sale-price">{hotspot.pricing.sale}</span>
                                )}
                                {discount && (
                                  <span className="discount-badge">{discount}% OFF</span>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Fullscreen overlay */}
      <div
        className={`fullscreen-overlay ${isFullscreenOpen ? 'active' : ''}`}
        onClick={closeFullscreen}
      >
        <img
          className="fullscreen-image"
          src={fullscreenImage}
          alt="Fullscreen view"
        />
        <div className="close-button" onClick={closeFullscreen}>×</div>
      </div>
    </>
  )
}

export default GridHotspotGallery