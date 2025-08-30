"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CurtainsInstallationsImg from "@/public/img/services/curtains-installations.png";
import UpholsteryImg from "@/public/img/services/upholstery-services.png";
import FlooringImg from "@/public/img/services/flooring-installations.png";
import WallpaperImg from "@/public/img/services/wallpaper-installations.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: 'Curtains & Installations',
    href: '/curtains',
    image: CurtainsInstallationsImg,
  },
  {
    id: 2,
    title: 'Upholstery & Services',
    href: '/upholstery',
    image: UpholsteryImg,
  },
  {
    id: 3,
    title: 'Flooring & Installations',
    href: '/flooring',
    image: FlooringImg
  },
  {
    id: 4,
    title: 'Wallpaper & Installations',
    href: '/wallpaper',
    image: WallpaperImg
  }
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, threshold: 0.3 });

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
    >
      <Image
        src={service.image}
        alt={service.title}
      />

      <div className="py-4">
        <h2 className="md:text-xl text-lg tracking-wide mb-2">{service.title}</h2>
        <Link href={service.href} className='flex items-center gap-2 text-black font-extralight transition-all duration-150 self-start group'>
          View Now

          <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delay: 1 * .5
      }
    }
  };

  return (
    <section className='bg-[#eae9e9] overflow-x-hidden py-8'>
      <div className="w-full max-w-[85rem] mx-auto px-2">
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
          <h2 className="md:text-4xl text-2xl font-extralight text-gray-700 tracking-wide">
            Services
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
