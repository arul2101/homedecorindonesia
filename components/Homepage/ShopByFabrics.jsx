"use client"

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UpholsteryImg from "@/public/img/shop-by-fabrics/upholsteryfabrics.png";
import PromotionalImg from "@/public/img/shop-by-fabrics/promotionalfabrics.png";
import { useRef } from "react";

export default function ShopByFabrics() {
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: .8,
        ease: "easeOut",
      }
    }
  };

  const cardVariantsRight = {
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
    <section className='overflow-x-hidden'>
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
            Shop By Fabrics
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Drapery Fabric */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative md:h-[100%] h-[20rem] overflow-hidden shadow-lg">
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[url('./../public/img/shop-by-fabrics/draperyfabrics.png')]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl mb-4">
                  Drapery Fabric
                </h3>
                
                <Link
                  href="/product-category/draperyfabrics"
                  className="inline-flex items-center gap-2 text-white bg-[rgba(193,192,192,0.6)] px-6 py-2 transition-all duration-300 self-start group"
                >
                  Shop Now
                  <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="md:space-y-4 space-y-2">
            {/* 2 card in side */}
            <motion.div
              className=''
              variants={cardVariantsRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image
                src={UpholsteryImg}
                alt='upholstery image'
                width={1920}
                height={720}
              />

              <div className='mt-2 space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='tracking-wide'>HANDPICKED BY HOME DECOR</h2>
                  <Link href="/upholstery" className='flex items-center gap-2 text-black font-extralight transition-all duration-150 self-start group'>
                    Shop Now
                    <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
                  </Link>
                </div>

                <p className='font-extralight text-black'>Upholstery Fabric</p>
              </div>
            </motion.div>

            <motion.div
              className=''
              variants={cardVariantsRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image
                src={PromotionalImg}
                alt='Promotional image'
                width={1920}
                height={720}
              />

              <div className='mt-2 space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='tracking-wide'>SALE UPTO 30% OFF</h2>
                  <Link href="/product-category/promotionalfabrics" className='flex items-center gap-2 text-black font-extralight transition-all duration-150 self-start group'>
                    Shop Now
                    <ArrowUpRight className='hover:rotate-45 group-hover:rotate-45 transition-all duration-500' />
                  </Link>
                </div>

                <p className='font-extralight text-black'>Promotional Fabric</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
