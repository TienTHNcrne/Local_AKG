import React from "react";

interface FooterLinkGroup {
  title: string;
  links: string[];
}

interface FooterSectionProps {
  linkGroups: FooterLinkGroup[];
  description: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  linkGroups,
  description,
}) => {
  return (
    <footer className="px-8 py-12 mt-32 w-full bg-green-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="ml-7 max-w-full w-[865px]">
        <div className="flex gap-5 max-md:flex-col">
          {linkGroups.map((group, index) => (
            <div
              key={index}
              className={`${index === 0 ? "w-[41%]" : index === 1 ? "w-[34%]" : "w-3/12"} max-md:ml-0 max-md:w-full`}
            >
              <div className="flex flex-col text-neutral-100 max-md:mt-10">
                <h3 className="self-start text-3xl">{group.title}</h3>
                {group.links.length > 0 && (
                  <div className="flex flex-col items-start pl-7 mt-6 text-2xl max-md:pl-5">
                    {group.links.map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className={linkIndex > 0 ? "mt-2.5" : ""}
                      >
                        {link}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-9 text-3xl text-white max-md:max-w-full">
        {description}
      </div>
    </footer>
  );
};
