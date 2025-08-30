'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import BedRoomImg from "@/public/img/shop-by-room/bedroom.png";
import LivingRoomImg from "@/public/img/shop-by-room/living-room.png";
import OfficeImg from "@/public/img/shop-by-room/office.png";
import DiningRoomImg from "@/public/img/shop-by-room/dining-room.png";


const RoomCard = ({ room }) => {
  const cardVariantsOdd = {
    hidden: { 
      opacity: 0, 
      x: -50,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: .8,
        ease: "easeOut",
      }
    }
  };

  const cardVariantsEven = {
    hidden: { 
      opacity: 0, 
      x: 50,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: .8,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.div
      className=''
      variants={room.id % 2 === 0 ? cardVariantsEven : cardVariantsOdd}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Image
        src={room.image}
        alt={room.name}
        width={1920}
        height={720}

      />

      <div className='mt-2 space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='tracking-wide'>{room.subtitle}</h2>
          <Link href={room.href} className='flex items-center gap-2 text-black font-extralight transition-all duration-150 self-start group'>
            Shop Now
            <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
          </Link>
        </div>

        <p className='font-extralight text-black'>{room.title}</p>
      </div>
    </motion.div>
  )
}

export default function ShopByRoom(){
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.5 });

  const rooms = [
    {
      id: 1,
      href: '/furniture-bed-room',
      title: "Bed Room",
      subtitle: "HANDPICKED BY HOME DECOR",
      image: BedRoomImg,
      sale: null
    },
    {
      id: 2,
      href: '/furniture-living-room',
      title: "Living Room",
      subtitle: "HANDPICKED BY HOME DECOR",
      image: LivingRoomImg,
      sale: null
    },
    {
      id: 3,
      href: '/furniture-office',
      title: "Office",
      subtitle: "SALE UPTO 30% OFF",
      image: OfficeImg,
      sale: "SALE UPTO 30% OFF"
    },
    {
      id: 4,
      href: '/furniture-dining-room',
      title: "Dining Room",
      subtitle: "SALE UPTO 30% OFF",
      image: DiningRoomImg,
      sale: "SALE UPTO 30% OFF"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className='bg-[#eae9e9] overflow-x-hidden'>
      <div className="w-full max-w-[85rem] mx-auto px-2 py-16">
        <motion.div 
          className="text-center mb-12"
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
          } : {}}
        >
          <h2 className="md:text-4xl text-2xl font-extralight text-gray-700 tracking-wide">
            Shop By Room
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </motion.div>
      </div>
    </section>
    
  );
};