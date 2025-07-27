import React from "react";
import styles from "./Home.module.scss";
import ConLmg from "../../components/ConImg/ConImg";
import { Outlet } from "react-router-dom";
export default function Home() {
    const boxes = [
        "Vị trí",
        "Khí hậu",
        "Lịch sử",
        "Địa điểm và món ăn không thể bỏ qua",
        "Lưu ý",
        "Văn hoá - Xã hội",
    ];

    return (
        <div className={styles.container}>
            {boxes.map((value, id) => (
                <ConLmg />
            ))}
            <Outlet />
        </div>
    );
}
