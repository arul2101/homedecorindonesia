'use client'

import React, { useState, useRef, useEffect } from 'react';
import { User, UserRound, X } from 'lucide-react';

export default function LoginDropdown(){
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const openDropdown = () => {
    setIsOpen(true);
    setIsAnimating(true);
  };

  const closeDropdown = () => {
    setIsAnimating(false);
    // Wait for exit animation to complete before removing from DOM
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Framer-motion-like animation variants (simulated with CSS)
  const dropdownVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
  };

  const getDropdownStyle = () => {
    const variant = isAnimating ? dropdownVariants.animate : dropdownVariants.exit;
    return {
      opacity: variant.opacity,
      transform: `scale(${variant.scale}) translateY(${variant.y}px)`,
      transition: variant.transition,
      transformOrigin: 'top right'
    };
  };

  return (
    <div className="relative">
      {/* User Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="p-2 text-black hover:text-gray-700 transition-colors sm:block hidden"
      >
        <UserRound className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dropdown Form - Framer Motion Style Animation */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl w-96 border border-gray-200 z-40"
          style={getDropdownStyle()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4 pb-2">
            <button
              onClick={closeDropdown}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 px-6 -mt-2">
            <button
              onClick={() => setActiveTab('signin')}
              className={`pb-4 px-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'signin'
                  ? 'text-black border-black'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-4 px-2 text-lg font-medium border-b-2 ml-8 transition-colors duration-200 ${
                activeTab === 'create'
                  ? 'text-black border-black'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              Create an Account
            </button>
          </div>

          {/* Form Content with stagger animation */}
          <div className="p-6">
            {activeTab === 'signin' ? (
              <div className="space-y-4">
                {/* Username Field */}
                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.1s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Username or email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                {/* Password Field */}
                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.2s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                {/* Login Button */}
                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.3s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <button
                    type="button"
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
                  >
                    LOGIN
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div 
                  className="text-center pt-2 animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.4s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                  >
                    Lost your password?
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Create Account Form */}
                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.1s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.2s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.3s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>

                <div 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: isAnimating ? '0.4s' : '0s',
                    animationFillMode: 'both'
                  }}
                >
                  <button
                    type="button"
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Framer Motion-style CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-fade-out-down {
          animation: fadeOutDown 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        /* Spring-like animation similar to framer-motion */
        .dropdown-spring-enter {
          animation: springEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .dropdown-spring-exit {
          animation: springExit 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        @keyframes springEnter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes springExit {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};