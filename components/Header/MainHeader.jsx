import Image from "next/image";
import Logo from "@/public/img/Logo.png";
import Link from "next/link";
import NavLinksMobile from "./NavLinksMobile";
import LoginDropdown from "./LoginDropdown";
import ShoppingCart from "./ShoppingCart";
import SearchInput from "./SearchInput";

export default function MainHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="sm:hidden block">
          <NavLinksMobile />
        </div>
        <Link href="/">
          <Image
            src={Logo}
            alt='Logo Homedecorindonesia'
            className='sm:w-[14rem] w-[10rem]'
          />
        </Link>

        <div className="flex items-center sm:space-x-6 space-x-2">
          <LoginDropdown />
          <ShoppingCart />
          <SearchInput />
        </div>
      </div>
    </div>
  )
}
