'use client'

import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Pin, Music2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };


  return (
    <footer className="bg-gray-100 md:mb-0 mb-20">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Customer Service Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Book An Appointment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Discontinued Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Refund and Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Mon – Sat, 9:30AM – 6:30PM</p>
                <p className="text-gray-600">Sunday, 11:59AM – 5:00PM</p>
              </div>
              <div>
                <p className="text-gray-600">Email: online@homedecorindonesia.com</p>
              </div>
              <div>
                <p className="text-gray-600">Phone: (62-21) 7224248 (Hunting)</p>
                <p className="text-gray-600">(62-21) 72794215</p>
                <p className="text-gray-600">(62-21) 72789513</p>
                <p className="text-gray-600">(62-21) 7230970</p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#39483f] text-white py-3 px-4 rounded-md hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-900 hover:text-amber-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-900 hover:text-amber-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-900 hover:text-amber-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-900 hover:text-amber-600 transition-colors">
                <Pin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-900 hover:text-amber-600 transition-colors">
                <Music2 className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-600">© 2025 Home Decor. All Rights Reserved</p>
            </div>

            {/* Privacy & Cookie */}
            <div>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy & Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
