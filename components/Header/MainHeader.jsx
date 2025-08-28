import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/img/Logo.png";
import Link from "next/link";

export default function MainHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <Link href="/">
          <Image
            src={Logo}
            alt='Logo Homedecorindonesia'
            className='w-[14rem]'
          />
        </Link>

        <div className="flex items-center space-x-6">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <User className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
