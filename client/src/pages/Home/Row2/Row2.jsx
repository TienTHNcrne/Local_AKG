import React from "react";
import styles from "./Row2.module.scss";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Row2() {
  const NextPage = useNavigate();
  const features = [
    {
      id: 1,
      title: "Tổng quan",
      description:
        "An Giang nằm ở vùng đồng bằng sông Cửu Long, giáp biên giới Campuchia, nổi bật với cảnh quan sông nước và núi non hùng vĩ.",
      image: "/imgs/festival/kinh/1.jpg",
      link: "/Location",
      buttonText: "Khám phá",
    },
    {
      id: 2,
      title: "Lịch sử",
      description:
        "Với hơn 200 năm hình thành, An Giang lưu giữ nhiều di tích lịch sử quan trọng gắn liền với quá trình khai phá miền Tây Nam Bộ.",
      image: "/imgs/KSAG-2.png",
      link: "/History",
      buttonText: "Tìm hiểu",
    },
    {
      id: 4,
      title: "Khí hậu",
      description:
        "Khí hậu nhiệt đới gió mùa, nắng ấm quanh năm, chia thành mùa mưa và mùa khô rõ rệt, thích hợp cho nông nghiệp và du lịch.",
      image: "/imgs/KH.jpg",
      link: "/Climate",
      buttonText: "Tìm hiểu",
    },
    {
      id: 5,
      title: "Dân tộc",
      description:
        "Người Kinh, Khmer, Chăm và Hoa cùng chung sống hòa thuận, tạo nên một nền văn hóa đa dạng với nhiều lễ hội truyền thống đặc sắc.",
      image: "/imgs/ethnic_4.png",
      link: "/CulSoc",
      buttonText: "Khám phá",
    },
    {
      id: 6,
      title: "Tôn giáo ",
      description:
        "An Giang là cái nôi của nhiều tôn giáo và tín ngưỡng, nổi bật như Phật giáo Hòa Hảo, Bửu Sơn Kỳ Hương, cùng các ngôi chùa cổ kính.",
      image: "/imgs/end/hoi/1.png",
      link: "/Religion",
      buttonText: "Tìm hiểu",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tìm hiểu thêm về An Giang</h1>
        <p className={styles.subtitle}>
          Khám phá vẻ đẹp đa dạng từ văn hóa, lịch sử đến thiên nhiên hùng vĩ
          của vùng đất An Giang
        </p>
      </div>
      <div className={styles.cards}>
        {features.map((value, id) => (
          <div
            className={styles.card}
            key={id}
            onClick={() => {
              NextPage(`${value.link}`);
            }}
          >
            <img src={value.image} alt="" />
            <div className={styles.content}>
              <h3>{value.title}</h3>
              <p> {value.description}</p>
              <button
                className={styles.btn}
                onClick={() => {
                  NextPage(`${value.link}`);
                }}
              >
                <span>{value.buttonText}</span>
                <div className={styles.icon}>→</div>
              </button>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
