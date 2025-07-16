"use client";

import React from "react";
import HeaderImage from "./HeaderImage";
import HeroSection from "./HeroSection";
import ContentGrid from "./ContentGrid";
import Footer from "./Footer";

export default function AnGiangHomepage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display:wght@400&family=Inter:wght@400&family=Instrument+Serif:wght@400&family=Andada+Pro:wght@400&display=swap"
      />
      <main className="relative w-full min-h-screen bg-white">
        <HeaderImage />
        <div className="relative px-0 pt-7 pb-0 w-full">
          <HeroSection />
          <ContentGrid />
        </div>
        <Footer />
      </main>
    </>
  );
}
