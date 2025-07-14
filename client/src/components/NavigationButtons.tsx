import React from "react";

interface NavigationItem {
  label: string;
  href?: string;
}

interface NavigationButtonsProps {
  items: NavigationItem[];
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  items,
}) => {
  return (
    <nav className="flex flex-wrap gap-8 items-start self-start text-2xl text-center text-black">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center px-4 py-1.5 bg-zinc-300 rounded-[30px] max-md:px-5"
        >
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};
