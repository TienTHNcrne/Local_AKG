"use client";

import React from "react";
import ContentCard from "./ContentCard";

const contentItems = [
  {
    title: "Khí hậu",
    position: "absolute h-[217px] left-[566px] top-[26px] w-[331px]",
    imageHeight: "h-[210px]",
    imageWidth: "w-[331px]",
    titlePosition:
      "absolute left-2.5 text-2xl text-black h-[51px] top-[166px] w-[201px]",
  },
  {
    title: "Vị trí",
    position: "absolute h-[291px] left-[130px] top-[97px] w-[261px]",
    imageHeight: "h-[237px]",
    imageWidth: "w-[261px]",
    titlePosition:
      "absolute left-2.5 text-2xl text-black h-[86px] top-[205px] w-[117px]",
  },
  {
    title: "Lịch sử",
    position: "absolute h-[251px] left-[1046px] top-[222px] w-[322px]",
    imageHeight: "h-[209px]",
    imageWidth: "w-[322px]",
    titlePosition:
      "absolute text-2xl text-black h-[85px] left-[19px] top-[166px] w-[198px]",
  },
  {
    title: "Văn hoá - Xã hội",
    position: "absolute h-[228px] left-[55px] top-[472px] w-[287px]",
    imageHeight: "h-[194px]",
    imageWidth: "w-[287px]",
    titlePosition:
      "absolute text-2xl text-black h-[75px] left-[7px] top-[153px] w-[233px]",
  },
  {
    title: "Lưu ý",
    position: "absolute h-[237px] left-[473px] top-[641px] w-[207px]",
    imageHeight: "h-[207px]",
    imageWidth: "w-[207px]",
    titlePosition:
      "absolute text-2xl text-black h-[62px] left-[11px] top-[175px] w-[152px]",
  },
  {
    title: "Địa điểm và món ăn không thể bỏ qua",
    position: "absolute h-[322px] left-[906px] top-[602px] w-[368px]",
    imageHeight: "h-[279px]",
    imageWidth: "w-[368px]",
    titlePosition:
      "absolute text-2xl text-black h-[117px] left-[30px] top-[205px] w-[290px]",
  },
];

export default function ContentGrid() {
  return (
    <section className="relative w-full h-[900px] max-md:p-5 max-md:h-auto max-sm:p-2.5">
      {contentItems.map((item, index) => (
        <ContentCard
          key={index}
          title={item.title}
          position={item.position}
          imageHeight={item.imageHeight}
          imageWidth={item.imageWidth}
          titlePosition={item.titlePosition}
        />
      ))}
    </section>
  );
}
