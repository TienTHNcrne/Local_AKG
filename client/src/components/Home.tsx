import React from "react";
import { HeroSection } from "./HeroSection";
import { MainContentSection } from "./MainContentSection";
import { FooterSection } from "./FooterSection";

const footerData = [
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

const footerDescription =
  "AKG - Trang web giúp người dùng tìm hiểu về du lịch và dựng lịch trình du lịch về tỉnh An Giang mới";

function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSection imageUrl="https://cdn.builder.io/api/v1/image/assets/cae48672dd4c47afa4206626134a93ff/9d05c8e885cac3fdad0d5ab4422fa932e26a2e93?placeholderIfAbsent=true" />
      <MainContentSection />
      <FooterSection linkGroups={footerData} description={footerDescription} />
    </div>
  );
}

export default Home;
