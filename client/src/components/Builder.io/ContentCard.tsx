"use client";

import React from "react";

interface ContentCardProps {
  title: string;
  position: string;
  imageHeight: string;
  imageWidth: string;
  titlePosition: string;
}

export default function ContentCard({
  title,
  position,
  imageHeight,
  imageWidth,
  titlePosition,
}: ContentCardProps) {
  return (
    <article
      className={`${position} max-md:block max-md:relative max-md:top-auto max-md:left-auto max-md:mx-auto max-md:my-5 max-sm:mx-auto max-sm:my-4 max-sm:w-[90%]`}
    >
      <div
        className={`absolute top-0 left-0 bg-zinc-300 ${imageHeight} ${imageWidth}`}
      />
      <h2 className={`${titlePosition} max-sm:text-xl`}>{title}</h2>
    </article>
  );
}
