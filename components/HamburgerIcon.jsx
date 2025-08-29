import React from 'react'

export default function HamburgerIcon({ 
  className = "w-6 h-6", 
  color = "text-gray-700",
  lineHeight = "h-[.06rem]",
  spacing = "space-y-1.5"
}) {
  return (
    <div className={`${className} flex flex-col justify-center ${spacing} cursor-pointer group`}>
      <div className={`w-full ${lineHeight} bg-current ${color} rounded-full`}></div>
      <div className={`w-[50%] group-hover:w-full duration-150 ${lineHeight} bg-current ${color} rounded-full`}></div>
      <div className={`w-full ${lineHeight} bg-current ${color} rounded-full`}></div>
    </div>
  );
};
