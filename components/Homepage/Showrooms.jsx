'use client'

import { motion, useInView } from 'framer-motion';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import React, { useRef } from 'react'

const data = [
  {
    id: 1,
    title: 'Fatmawati',
    location: 'Jalan Rs Fatmawati No. 5A,C,D, RT.1/RW.6, Gandaria Utara, Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12140',
    open: 'Monday - Saturday : 9.30 AM - 6.30 PM',
    sunday: 'Sunday: 11.59 AM - 5.00 PM',
    embed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7932.0705785309265!2d106.796633!3d-6.259082!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f16e1d1e768d%3A0x4beb3c2b3ec125e8!2sHome%20Decor%20Indonesia!5e0!3m2!1sen!2sus!4v1756635047534!5m2!1sen!2sus'
  },
  {
    id: 2,
    title: 'Pintu Air',
    location: 'Jl. Pintu Air Raya No.29, RT.6/RW.1, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710',
    open: 'Monday - Saturday : 9.30 AM - 6.30 PM',
    sunday: 'Sunday: 11.59 AM - 5.00 PM',
    embed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7933.484380953426!2d106.831645!3d-6.16527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5ccf06ce333%3A0x16c8ced67f60b79f!2sHome%20Decor%20Indonesia!5e0!3m2!1sen!2sus!4v1756635953604!5m2!1sen!2sus'
  },
];

const CardShowrooms = ({ item }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, threshold: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isCardInView ? { 
        opacity: 1, 
        y: 0, 
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay: item.id * .5
        }
      } : {}}
      className='shadow-[0px_0px_10px_0px_rgba(168.3,_168.3,_168.3,_0.5)] rounded-lg bg-white text-black p-8'
    >
      <h2 className='text-center text-xl md:text-3xl text-gray-700'>{item.title}</h2>

      <div className='my-6 space-y-4'>
        <div className='flex gap-4 items-start font-normal tracking-wide'>
          <MapPin className='h-8 w-8' strokeWidth={1} />
          <span>{item.location}</span>
        </div>

        <div className='flex gap-4 items-start font-normal tracking-wide'>
          <CalendarDays className='h-5 w-5' />
          <span>{item.open}</span>
        </div>

        <div className='flex gap-4 items-start font-normal tracking-wide'>
          <Clock className='h-5 w-5' />
          <span>{item.sunday}</span>
        </div>
      </div>

      <div className="">
        <iframe src={item.embed} width="100%" height="350" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </motion.div>
  )
}

export default function Showrooms() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.5 });

  return (
    <section className='py-8'>
      <div className="max-w-[85rem] mx-auto px-2">
        <motion.div 
          className="text-center mb-8"
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
          } : {}}
        >
          <h2 className="md:text-4xl text-2xl font-extralight text-gray-700 tracking-wide mb-4">
            Visit Our Showrooms
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {data.map((item) => (
            <CardShowrooms item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
