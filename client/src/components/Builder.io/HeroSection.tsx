"use client";

import React from "react";
import NavigationButtons from "./NavigationButtons";

export default function HeroSection() {
  return (
    <section className="absolute z-10 h-[222px] left-[364px] top-[331px] w-[711px] max-md:left-[5%] max-md:top-[280px] max-md:w-[90%] max-sm:top-[200px]">
      <h1 className="absolute top-0 left-0.5 text-8xl text-center text-black h-[148px] w-[709px] max-md:w-full max-md:text-7xl max-sm:text-6xl">
        An Giang
      </h1>
      <p className="absolute left-0 text-4xl italic text-center text-black h-[148px] top-[33px] w-[709px] max-md:w-full max-md:text-3xl max-sm:text-2xl">
        Nơi sơn thuỷ hải giao hoà một cõi
      </p>
      <NavigationButtons />
    </section>
  );
}
