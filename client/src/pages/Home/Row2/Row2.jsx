import React, { useState } from "react";
import styles from "./Row2.module.scss";
import clsx from "clsx";
const provinces = [
    "An Giang",
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Khánh Hòa",
    "Huế",
    "Lâm Đồng",
    "Quảng Ninh",
    "Đồng Nai",
    "Ninh Bình",
];

export default function Row2() {
    const [province, setProvince] = useState("An Giang");
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Phủ sóng toàn quốc</h1>
                <p className={styles.subtitle}>
                    Mỗi tỉnh thành là một “bản sao số” trong hệ sinh thái
                    AGiLand.
                </p>
            </div>

            <div className={styles.grid}>
                {provinces.map((item, index) => (
                    <span
                        key={index}
                        className={clsx(styles.province, {
                            [styles.selected]: province === item,
                        })}
                        onClick={() => setProvince(item)}
                    >
                        {item}
                    </span>
                ))}
            </div>
            <h2 className={styles.developmentMessage}>
                AGiLand đang mở rộng để kết nối mọi địa phương trên cả nước
            </h2>
        </div>
    );
}
