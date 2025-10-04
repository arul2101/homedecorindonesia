'use client'

import Link from 'next/link'
import Image from 'next/image'
import HeroSectionSlider1 from '@/components/Common/HeroSectionSlider-1'
import Showrooms from '@/components/Homepage/Showrooms'

export default function UpholsteryPage() {
  const slides = [
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/UPHOLSTERY-1.jpg',
      title: 'Premium Upholstery Services',
      subtitle: 'Transform your furniture with expert craftsmanship',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Get Quote',
        href: '/contact',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/UPHOLSTERY-2.jpg',
      title: 'Custom Furniture Solutions',
      subtitle: 'Bespoke designs tailored to your style',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Explore Designs',
        href: '/upholstery/services',
        variant: 'outline'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/UPHOLSTERY-3.jpg',
      title: 'Quality Materials',
      subtitle: 'Premium fabrics and sustainable materials',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'View Materials',
        href: '/upholstery/materials',
        variant: 'primary'
      }
    }
  ]

  const services = [
    {
      id: 'sofa-chair-upholstery',
      title: 'Sofa & Chair Upholstery',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/SOFA-UPHOLSTERY.jpg',
      href: '/upholstery/sofa-chair'
    },
    {
      id: 'custom-sofas-chairs',
      title: 'Custom Sofas & Chairs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/CUSTOM-SOFAS.jpg',
      href: '/upholstery/custom-sofas'
    },
    {
      id: 'custom-beds-headboards',
      title: 'Custom Beds & Headboards',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/CUSTOM-BEDS.jpg',
      href: '/upholstery/beds-headboards'
    },
    {
      id: 'custom-foams-cushions',
      title: 'Custom Foams & Cushions',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/CUSTOM-CUSHIONS.jpg',
      href: '/upholstery/foams-cushions'
    },
    {
      id: 'fabric-wall-panelling',
      title: 'Custom Fabric Wall Panelling',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/FABRIC-PANELLING.jpg',
      href: '/upholstery/wall-panelling'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSectionSlider1 slides={slides} autoPlayInterval={5000} />

      {/* Welcome Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
              Upholstery Services: Give New Life to Your Beloved Furniture
            </h2>
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-600 leading-relaxed">
              Welcome to our upholstery service section. We specialize in providing high-quality upholstery services to give your furniture a new lease of life.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Our Services
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background Image with Overlay */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-light tracking-wide mb-6">
                    {service.title}
                  </h3>

                  {/* View More Button */}
                  <Link
                    href={service.href}
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-light tracking-wide transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                  >
                    <span>View More</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
       <section className="py-20 md:py-32">
               <div className="container mx-auto px-6 max-w-7xl">
                 {/* Section Title */}
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
                      Featured Products
                    </h2>
                    <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
                   </div>
      
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[
                       {
                      id: 'premium-fabrics',
                        title: 'Premium Fabric Collection',
                       image:
           'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/FABRIC-COLLECTION.jpg',
                       href: '/upholstery/fabrics',
                      description: 'Discover our exclusive range of high-quality fabrics'
                   },
                    {
                       id: 'upholstery-tools',
                       title: 'Professional Upholstery Tools',
                    image:
         'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/UPHOLSTERY-TOOLS.jpg',
                   href: '/upholstery/tools',
                     description: 'Professional-grade tools for perfect upholstery work'
                   }
                   ].map((product, index) => (
                     <div
                      key={product.id}
                       className="group relative overflow-hidden rounded-lg shadow-lg transform
          transition-all duration-700 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
                        style={{
                        animationDelay: `${(index + 5) * 0.1}s`
                        }}
                   >
                        {/* Background Image with Overlay - Rectangular */}
                      <div className="relative h-96 overflow-hidden">
                        <Image
                           src={product.image}
                           alt={product.title}
                           fill
                            className="object-cover transition-transform duration-700
          group-hover:scale-110"
                        />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40
          to-transparent"></div>
                       </div>
      
                       {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center
         text-white p-8 text-center">
                         <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                            {product.title}
                           </h3>
                          {product.description && (
                            <p className="text-base md:text-lg font-light mb-6 max-w-md">
                               {product.description}
                            </p>
                           )}
      
                        {/* View More Button */}
                           <Link
                             href={product.href}
                            className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-black
            text-white font-light tracking-wide transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                           >
                         <span>View More</span>
                           <svg
                       className="w-4 h-4 transition-transform duration-300
   group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7
   17L17 7M17 7H7M17 7V17" />
                      </svg>
                   </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* expect from us */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              Here's what you can expect from us:
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Skilled and Experienced Craftsmen', desc: 'Expert consultation to understand your needs and preferences' },
              { step: '02', title: 'Commitment to Quality', desc: 'Professional measurement of your windows for perfect fit' },
              { step: '03', title: 'DesWide Range of Upholstery Fabric Optionsign', desc: 'Custom design selection based on your style and requirements' },
              { step: '04', title: 'Exceptional Craftsmanship and Customer Service', desc: 'Professional installation by our experienced team' },
              { step: '05', title: 'Customisation options for Sofas, Chairs, Foam Cushions & Upholstered Beds', desc: 'Post-installation support and maintenance advice' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-gray-400 mb-4">{item.step}</div>
                <h3 className="text-xl font-light tracking-wide mb-2">{item.title}</h3>
                <p className="text-gray-600 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Book A Free Home Visit */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl font-extralight tracking-wider mb-6 text-white">
              Book A Free Home Visit
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-300 mb-12 max-w-2xl mx-auto">
              Let our experts visit your home, understand your needs, and provide personalized recommendations for your upholstery projects
            </p>

            {/* Book Now Button */}
            <div className="inline-flex items-center justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-white to-gray-100 text-black font-medium tracking-wide transition-all duration-500 transform hover:scale-105 hover:shadow-2xl rounded-full overflow-hidden"
              >
                {/* Button Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <span className="transition-all duration-300 group-hover:translate-x-1">Book Now</span>
                  <svg
                    className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                <span className="text-sm font-light">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-light">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-sm font-light">No Obligation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <Showrooms />

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}