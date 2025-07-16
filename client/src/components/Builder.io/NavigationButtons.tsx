"use client";

import React from "react";

const navigationItems = ["Trang chủ", "Khám phá", "Sự kiện", "Về chúng tôi"];

export default function NavigationButtons() {
  return (
    <nav className="flex absolute gap-8 h-[41px] left-[27px] top-[181px] w-[674px] max-md:flex-wrap max-md:gap-4 max-md:justify-center max-md:w-full max-sm:flex-col max-sm:gap-3 max-sm:items-center">
      {navigationItems.map((item, index) => (
        <button
          key={index}
          className="relative h-10 max-md:w-auto max-md:min-w-[120px] max-sm:w-[200px]"
        >
          <div className="absolute top-0 left-0 w-full h-10 bg-zinc-300 rounded-[30px]" />
          <span className="flex absolute justify-center items-center w-full text-2xl text-center text-black h-[29px] top-[5px] max-md:text-xl max-sm:text-lg">
            {item}
          </span>
        </button>
      ))}
    </nav>
  );
}
