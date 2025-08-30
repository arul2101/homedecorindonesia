"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, threshold: 0.3 });
  const router = useRouter();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isCardInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay: index * .5
        }
      } : {}}
      className="relative cursor-pointer"
      onClick={() => router.push(category.href)}
    >
      <div className="relative h-[26rem] overflow-hidden shadow-lg">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${category.image}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl mb-4">
            {category.title}
          </h3>
          
          <Link
            href={category.href}
            className="inline-flex items-center gap-2 text-white bg-[rgba(193,192,192,0.6)] px-6 py-2 transition-all duration-300 self-start group"
          >
            {category.buttonText}
            <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function ShopByCategory(){
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.5 });

  const categories = [
    {
      id: 1,
      href: '/furniture',
      title: "Sofa & Furniture",
      image: "bg-[url('./../public/img/category/furniture.png')]",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      href: '/lighting',
      title: "Lighting",
      image: "bg-[url('./../public/img/category/lighting.png')]",
      buttonText: "Shop Now"
    },
    {
      id: 3,
      href: '/home-decor',
      title: "Decor Items",
      image: "bg-[url('./../public/img/category/home-decoration.png')]",
      buttonText: "Shop Now"
    },
    {
      id: 4,
      href: '/rugs',
      title: "Rugs",
      image: "bg-[url('./../public/img/category/rugs.png')]",
    buttonText: "Shop Now"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-[85rem] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
          } : {}}
          className="text-center mb-12"
        >
          <h1 className="md:text-4xl text-2xl text-black tracking-wide mb-8">
            Find Home Decor Products and Services Online
          </h1>
          <p className="text-2xl text-gray-600 font-extralight">
            Shop By Category
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};