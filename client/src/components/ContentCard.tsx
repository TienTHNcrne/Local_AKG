import React from "react";

interface ContentCardProps {
  title: string;
  className?: string;
  paddingTop?: string;
  width?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  className = "",
  paddingTop = "pt-52",
  width = "w-full",
}) => {
  return (
    <section
      className={`flex flex-col items-start px-2.5 ${paddingTop} pb-2.5 ${width} text-2xl text-black bg-zinc-300 max-md:pt-24 max-md:pr-5 ${className}`}
    >
      <h2>{title}</h2>
    </section>
  );
};
