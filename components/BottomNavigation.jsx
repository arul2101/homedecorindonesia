'use client'

import { Home, User, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

export default function BottomNavigation() {

  const menuItems = [
    {
      id: 'shop',
      href: '/shop',
      icon: Home,
      label: 'Shop',
    },
    {
      id: 'account',
      href: '/my-account',
      icon: User,
      label: 'My Account',
    },
    {
      id: 'cart',
      href: '/cart',
      icon: ShoppingCart,
      label: 'Cart',
    },
    {
      id: 'wishlist',
      href: '/wishlist',
      icon: Heart,
      label: 'Wishlist',
    }
  ];

  return (
    <div className="md:hidden block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex-1 flex items-center h-[4rem]">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-4 w-full transition-colors duration-200`}
                >
                  <Icon 
                    size={22} 
                    className={`mb-1 transition-transform duration-200`}
                  />
                  <span className={`text-xs font-medium transition-all duration-200`}>
                    {item.label}
                  </span>
                </Link>
                {/* Vertical divider - tidak tampil pada item terakhir */}
                {index < menuItems.length - 1 && (
                  <div className="h-full w-px bg-gray-200"></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}