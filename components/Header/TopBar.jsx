import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <a href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello%21%20." className="flex items-center space-x-2" target="_blank">
              <Phone className="w-4 h-4" />
              <span>+62 81806040506</span>
            </a>
            <Link href='/contact' className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </Link>
          </div>
          <div className="flex items-center">
            <select className="text-sm text-gray-600 bg-white border-none outline-none cursor-pointer">
              <option>English</option>
              <option>Bahasa Indonesia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
