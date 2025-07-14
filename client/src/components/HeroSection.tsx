import React from "react";

interface HeroSectionProps {
  imageUrl: string;
  alt?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrl,
  alt = "An Giang tourism hero image",
}) => {
  return (
    <header className="overflow-hidden bg-white">
      <img
        src={imageUrl}
        alt={alt}
        className="object-contain w-full aspect-[14.49] max-md:max-w-full"
      />
    </header>
  );
};
