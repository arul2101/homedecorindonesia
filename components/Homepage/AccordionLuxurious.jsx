'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCaretRight } from "react-icons/fa6";

const data = [
  {
    id: 1,
    title: 'A Realm of Custom Elegance',
    content: 'Nestled in South and Central Jakarta, our expansive showrooms are not just furniture shops; they are galleries where art meets function. As you step into our stores, you are greeted with a curated collection of custom sofas, chairs, and home furnishings that blend contemporary design with timeless elegance. Each custom piece is a testament to our commitment to quality and craftsmanship.'
  },
  {
    id: 2,
    title: 'Customized to Your Needs',
    content: 'Our upholstery services are at the heart of what we do. We believe that furniture should be as unique as the individuals who own it. Whether it’s a custom sofa tailored to fit your living room or custom curtains that add a touch of sophistication to your windows, our team of skilled artisans work tirelessly to bring your vision to life. With our commitment to quality and customization, your furniture becomes more than just an item in your home; it becomes a reflection of your individuality and an heirloom to be cherished for generations.'
  },
  {
    id: 3,
    title: 'Quality Fabrics',
    content: 'The interior fabrics we select are chosen for their quality, texture, and ability to complement any design aesthetic. From rich, luxurious velvets to light, airy linens, our range of fabrics is designed to cater to a diverse set of tastes and preferences.'
  },
  {
    id: 4,
    title: 'Online Shopping',
    content: [
      'In today’s fast-paced world, we understand the need for convenience without compromising on quality. Our online furniture shop is a testament to this understanding. Here, you can buy cushions online, browse through our extensive furniture online catalog, and find pieces that resonate with your style.',
      'Our online home decor showroom brings the in-store experience to you. Explore our range of wall art decor, indoor lighting, decorative acessories and wallpaper selections from the comfort of your home. Each category in our online catalog is meticulously curated to ensure that we offer a variety that is both wide and exclusive.',
      'When you buy cushions online from us, you’re not just purchasing a product; you’re adding a story to your home. Each cushion is crafted with attention to detail, ensuring it not only serves as a functional piece but also as an element of decor that elevates your space.',
      'Our furniture online collection is extensive, offering a range of styles from modern minimalist to classic opulence. The custom sofas and chairs featured online are designed with both aesthetics and comfort in mind. Whether you’re looking for a statement piece or something that blends into your existing decor, our online range has something for everyone.',
      'The wall art decor available in our online showroom is chosen to inspire and ignite creativity. From abstract metal works to modern decorative mirrors, each piece is selected to add personality and depth to your walls.',
    ]
  },
  {
    id: 5,
    title: 'Customer Service',
    content: [
      'In both our offline shop and online store, customer service is our top priority. We understand that buying furniture and home decor is not just a purchase; it’s an investment. That’s why we stand behind the quality of every product we offer. Our team is always available to assist you, whether you’re shopping in-store or online.',
      'Experience the fusion of art and living at Home Decor Indonesia. Call us today, and let us help you turn your house into a haven of style and luxury.'
    ]
  }
];

const AccordionItem = ({ data, expandedSections, toggleSection }) => {
  return (
    <motion.div 
      className="border-b border-gray-200 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <button
        onClick={() => toggleSection(data.id)}
        className="flex items-center justify-between w-full text-left group"
      >
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: expandedSections[data.id] ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaCaretRight className={`w-5 h-5 ${expandedSections[data.id] ? 'text-yellow-600' : 'text-black'} mr-3`} />
          </motion.div>
          <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
            {data.title}
          </span>
        </div>
      </button>
      
      <AnimatePresence>
        {expandedSections[data.id] && (
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
            <div className="pl-8 text-gray-600 leading-relaxed">
              {Array.isArray(data.content) ? (
                <div className="space-y-4">
                  {data.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p>{data.content}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AccordionLuxurious(){
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-[95rem] mx-auto px-8 mt-8 bg-white">
      {/* Header */}
      <div className="mb-12">
        <motion.h1 
          className="text-2xl md:text-4xl font-normal text-gray-800 mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Art of Luxurious Living
        </motion.h1>
        
        <motion.p 
          className="text-black tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          In the heart of Indonesia, Home Decor stands as a beacon of luxury and personalized style. Our journey began with a simple vision: to transform homes into spaces of unparalleled beauty and comfort. Today, our name is synonymous with elegance, quality, and the highest standards of customer service.
        </motion.p>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <AccordionItem key={index} data={item} expandedSections={expandedSections} toggleSection={toggleSection} />
        ))}
      </div>
    </div>
  );
};