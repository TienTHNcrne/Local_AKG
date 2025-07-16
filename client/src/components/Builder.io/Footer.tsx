"use client";

import React from "react";

const footerSections = [
  {
    title: "Thông tin",
    links: ["Về chúng tôi", "Về dự án"],
  },
  {
    title: "Nguồn",
    links: ["Thông tin", "Hình ảnh", "Bản đồ"],
  },
  {
    title: "Đánh giá",
    links: [],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-11 w-full h-[200px]">
      <div className="absolute top-0 left-0 w-full bg-green-300 h-[200px]" />
      <div className="flex relative px-16 pt-3.5 pb-0 size-full max-md:flex-col max-md:p-5">
        {footerSections.map((section, index) => (
          <div key={index} className="flex flex-col mr-36 max-md:mb-5">
            <h3 className="mb-3.5 text-3xl text-neutral-100 max-sm:text-3xl">
              {section.title}
            </h3>
            {section.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href="#"
                className="mb-2 text-2xl text-neutral-100 max-sm:text-2xl hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <p className="absolute top-40 w-full text-3xl text-white left-[30px] max-md:relative max-md:left-0 max-md:top-5 max-md:px-5 max-md:py-0 max-sm:px-4 max-sm:py-0 max-sm:text-2xl">
        AKG - Trang web giúp người dùng tìm hiểu về du lịch và dựng lịch trình
        du lịch về tỉnh An Giang mới
      </p>
    </footer>
  );
}
