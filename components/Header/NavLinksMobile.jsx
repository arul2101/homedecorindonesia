"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { navlinks } from "@/constant";
import HamburgerIcon from "../HamburgerIcon";

export default function NavLinksMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({});

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const listVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("overflow-y-hidden");
    } else {
      document.body.classList.add("overflow-y-hidden");
    }
  }, [isOpen]);

  const renderSubLinks = (links, depth = 0) => (
    <ul className={`ml-${depth * 4} mt-2 space-y-2 text-sm`}>
      {links.map((link, i) => (
        <motion.li
          key={link.name}
          custom={i}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={listVariants}
        >
          {link.hasDropdown ? (
            <>
              <button
                onClick={() => toggleDropdown(link.name)}
                className="flex justify-between w-full items-center"
              >
                <Link href={link.href}>
                  {link.name}
                </Link>
                {openDropdown[link.name] ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </button>

              <AnimatePresence>
                {openDropdown[link.name] && (
                  <motion.ul
                    key={link.name + "-list"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 mb-4 mt-2 space-y-2 overflow-hidden"
                  >
                    {renderSubLinks(link.sublinks, depth + 1)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link href={link.href} className="block hover:underline">
              {link.name}
            </Link>
          )}
        </motion.li>
      ))}
    </ul>
  )

  const renderLinks = (links, depth = 0) => (
    <ul className={`ml-${depth * 4} mt-2 space-y-2 text-sm`}>
      {links.map((link, i) => (
        <motion.li
          key={link.name}
          custom={i}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={listVariants}
        >
          {link.hasDropdown ? (
            <>
              <button
                onClick={() => toggleDropdown(link.name)}
                className="flex justify-between w-full items-center py-4 border-b border-gray-300"
              >
                <Link href={link.href}>
                  {link.name}
                </Link>
                {openDropdown[link.name] ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </button>

              <AnimatePresence>
                {openDropdown[link.name] && (
                  <motion.ul
                    key={link.name + "-list"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 mb-4 mt-2 space-y-2 overflow-hidden"
                  >
                    {renderSubLinks(link.sublinks, depth + 1)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link href={link.href} className="block w-full items-center py-4 border-b border-gray-300">
              {link.name}
            </Link>
          )}
        </motion.li>
      ))}
    </ul>
  );

  return (
    <div>
      <button onClick={toggleMenu} className="p-2 text-xl">
        <HamburgerIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-[21rem] h-full bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-medium flex items-center gap-4">
                <button onClick={toggleMenu}>
                  <HamburgerIcon />
                </button>
                <span>Menu</span>
              </h2>
              <button onClick={toggleMenu}>
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="px-8">
              {renderLinks(navlinks)}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
