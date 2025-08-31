'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import JuliVImg from "@/public/img/reviews/1-juli-v.png";
import FriscaImg from "@/public/img/reviews/2-frisca.png";
import RickieImg from "@/public/img/reviews/3-rickie.png";
import DapurImg from "@/public/img/reviews/4-dapur.png";
import DedeImg from "@/public/img/reviews/5-dede.png";
import BudiImg from "@/public/img/reviews/6-budi.png";
import RandikaImg from "@/public/img/reviews/7-randika.png";
import GemayelImg from "@/public/img/reviews/8-gemayel.png";
import LuthviImg from "@/public/img/reviews/9-luthvi.png";
import SheilaImg from "@/public/img/reviews/10-sheila.png";

const reviews = [
    {
      id: 1,
      name: "Juli V",
      avatar: JuliVImg,
      review: "Barang barang yang dijual bagus, mewah, dan keren designnya, semua kebutuhan perlengkapan rumah tersedia di toko ini, salesnya ramah. Recomended banget buat kalian yang sedang cari furniture seperti sofa, kursi, meja makan, nakas, tempat tidur dan gordyn, wallpaper, lantai kayu.",
      platform: "Google"
    },
    {
      id: 2,
      name: "Frisca Listyaningtyas",
      avatar: FriscaImg,
      review: "End to end pelayanan di sini memuaskan. Mulai dari survey utk pengukuran gorden, pemilihan bahan berkualitas, dan pemasangan. Setelah dipasang pun ada layanan steam sehingga gorden terpasang dengan rapi dan cantik. Very worth the price.",
      platform: "Google"
    },
    {
      id: 3,
      name: "Rhicke Jennings",
      avatar: RickieImg,
      review: "Home Decor Indonesia is an amazing store on three levels. The place is huge! Beautiful furniture, thousands of fabric and wall paper samples, tassels and trim. A lot of commercial grade furniture as is or a huge area for made to order. It is a truly stunning collection filled with possibilities.",
      platform: "Google"
    },
    {
      id: 4,
      name: "Dapur Mama Oen",
      avatar: DapurImg,
      review: "Salesnya ramah-ramah. Servicenya sales nya bagus. Barang-barangny komplit. Ada wallpaper. Gordyn. Sofa.",
      platform: "Google"
    },
    {
      id: 5,
      name: "Dede Soersno Boenarso",
      avatar: DedeImg,
      review: "Five Stars all around. Great place to shop on furnitures, curtain, wallpaper, props, and other decorative needs. Many interesting and unique items that you could not find anywhere else. So very happy with their staffs, always friendly and helpful in many ways. Highly recommended for interior designers.",
      platform: "Google"
    },
    {
      id: 6,
      name: "Budi",
      avatar: BudiImg,
      review: "Tempat yang bagus untuk mencari furniture, kain sofa dan wallpaper berkelas",
      platform: "Google"
    },
    {
      id: 7,
      name: "Randika Pratama",
      avatar: RandikaImg,
      review: "Very excellent service!! always helped by Pak Kunal on his excellent advice. Very top quality items!!",
      platform: "Google"
    },
    {
      id: 8,
      name: "Gemayel Mahtub",
      avatar: GemayelImg,
      review: "A great place to look for fabrics, wallpaper and all your interior design needs! They employ highly skillful and professional people who can help you with all your needs. Highly recommended!",
      platform: "Google"
    },
    {
      id: 9,
      name: "Luthvi Kusumawardini",
      avatar: LuthviImg,
      review: "Best service !! Good quality and various colors and patterns",
      platform: "Google"
    },
    {
      id: 10,
      name: "Sheila Zahranissa",
      avatar: SheilaImg,
      review: "Home Decor Indonesia merupakan tempat untuk mendesign furniture sesuai yang kita request seperti sofa, Gorden, Bantal. Tempatnya sangat nyaman & besar sekali, untuk harga sangat affordable & kualiatasnya sangat bagus, elegant, dan mewah💯",
      platform: "Google"
    },
  ];

const ReviewComponent = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, threshold: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isManualControl, setIsManualControl] = useState(false);
  const controls = useAnimation();
  
  const cardWidth = 400;
  const totalCards = reviews.length;
  const maxScroll = -(cardWidth * totalCards);
  
  useEffect(() => {
    let autoScrollTimeout;
    
    if (!isHovered && !isManualControl) {
      const autoScroll = async () => {
        let currentIndex = 0;
        
        const scrollStep = async () => {
          if (isHovered || isManualControl) return;
          
          currentIndex = (currentIndex + 1) % totalCards;
          const targetPosition = -(cardWidth * currentIndex);
          
          await controls.start({
            x: targetPosition,
            transition: { duration: 0.8, ease: "easeInOut" }
          });
          
          if (currentIndex === totalCards - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
            if (!isHovered && !isManualControl) {
              await controls.set({ x: 0 });
              currentIndex = -1;
            }
          }
          
          if (!isHovered && !isManualControl) {
            autoScrollTimeout = setTimeout(scrollStep, 3000);
          }
        };
        
        autoScrollTimeout = setTimeout(scrollStep, 3000);
      };
      
      autoScroll();
    }
    
    return () => {
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
      }
      controls.stop();
    };
  }, [isHovered, isManualControl, controls, maxScroll, cardWidth, totalCards]);

  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div className="py-12">
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
            Review
          </h2>
        </motion.div>
      
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          animate={controls}
          drag="x"
          dragConstraints={{ left: maxScroll, right: 0 }}
          dragElastic={0.1}
          whileDrag={{ cursor: "grabbing" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDragStart={() => setIsManualControl(true)}
          onDragEnd={() => {
            setTimeout(() => setIsManualControl(false), 1000);
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <motion.div
              key={index}
              className="sm:min-w-[25rem] min-w-[20rem] bg-white rounded-md p-3 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={1920}
                  height={1080}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {review.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <GoogleIcon />
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
                {review.review}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewComponent;