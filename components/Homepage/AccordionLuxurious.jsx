'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCaretRight } from "react-icons/fa6";

export default function AccordionLuxurious(){
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandableContent = {
    realm: "Nestled in South and Central Jakarta, our expansive showrooms are not just furniture shops; they are galleries where art meets function. As you step into our stores, you are greeted with a curated collection of custom sofas, chairs, and home furnishings that blend contemporary design with timeless elegance. Each custom piece is a testament to our commitment to quality and craftsmanship.",
    customized: "Our design consultants work closely with you to understand your unique preferences and lifestyle requirements. Every piece is meticulously crafted to reflect your personal taste while maintaining the highest standards of luxury and functionality.",
    quality: "We source only the finest materials from around the world. From premium Italian leather to sustainable hardwoods, every fabric and material is carefully selected for its durability, beauty, and environmental responsibility.",
    shopping: "Experience the convenience of luxury shopping from the comfort of your home. Our online platform offers detailed product information, virtual consultations, and seamless delivery services directly to your doorstep.",
    customer: `In both our offline shop and online store, customer service is our top priority. We understand that buying furniture and home decor is not just a purchase; it’s an investment. That’s why we stand behind the quality of every product we offer. Our team is always available to assist you, whether you’re shopping in-store or online. Experience the fusion of art and living at Home Decor Indonesia. Call us today, and let us help you turn your house into a haven of style and luxury.`
  };

  return (
    <div className="max-w-[95rem] mx-auto px-8 py-14 bg-white">
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
        <motion.div 
          className="border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={() => toggleSection('realm')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: expandedSections.realm ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCaretRight className="w-5 h-5 text-black mr-3" />
              </motion.div>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
                A Realm of Custom Elegance
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.realm && (
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
                  {expandableContent.realm}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Customized to Your Needs */}
        <motion.div 
          className="border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={() => toggleSection('customized')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: expandedSections.customized ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCaretRight className="w-5 h-5 text-black mr-3" />
              </motion.div>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
                Customized to Your Needs
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.customized && (
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
                  {expandableContent.customized}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quality Fabrics */}
        <motion.div 
          className="border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <button
            onClick={() => toggleSection('quality')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: expandedSections.quality ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCaretRight className="w-5 h-5 text-black mr-3" />
              </motion.div>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
                Quality Fabrics
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.quality && (
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
                  {expandableContent.quality}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Online Shopping */}
        <motion.div 
          className="border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={() => toggleSection('shopping')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: expandedSections.shopping ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCaretRight className="w-5 h-5 text-black mr-3" />
              </motion.div>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
                Online Shopping
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.shopping && (
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
                  {expandableContent.shopping}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Customer Service */}
        <motion.div 
          className="border-b border-gray-200 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={() => toggleSection('customer')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: expandedSections.customer ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaCaretRight className="w-5 h-5 text-black mr-3" />
              </motion.div>
              <span className="text-lg text-gray-800 group-hover:text-gray-600 transition-colors">
                Customer Service
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.customer && (
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
                  {expandableContent.customer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};