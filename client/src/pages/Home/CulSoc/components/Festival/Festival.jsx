import React, { useState } from "react";
import styles from "./Festival.module.scss";
import { festival } from "../../../../../data/festival";

export default function Festival() {
    const [activeTab, setActiveTab] = useState(0);

    // Ảnh từng dân tộc
    const imgs = {
        1: [
            "/imgs/festival/kinh/1.jpg",
            "/imgs/festival/kinh/2.jpg",
            "/imgs/festival/kinh/3.jpg",
            "/imgs/festival/kinh/4.jpg",
            "/imgs/festival/kinh/5.jpg",
            "/imgs/festival/kinh/6.jpg",
            "/imgs/festival/kinh/7.jpg",
            "/imgs/festival/kinh/8.jpg",
        ],
        2: [
            "/imgs/festival/km/1.jpeg",
            "/imgs/festival/km/2.jpg",
            "/imgs/festival/km/3.jpg",
            "/imgs/festival/km/4.jpg",
        ],
        3: ["/imgs/festival/hoa/1.jpg", "/imgs/festival/hoa/2.jpg"],
        4: [
            "/imgs/festival/cham/1.jpg",
            "/imgs/festival/cham/2.jpg",
            "/imgs/festival/cham/3.jpg",
        ],
    };

    const choose = (id, place) => imgs[place]?.[id];

    return (
        <div className={styles.container}>
            <h3>Lễ Hội</h3>

            {/* Tabs */}
            <div className={styles.tabs}>
                {festival.map((f, idx) => (
                    <button
                        key={idx}
                        className={`${styles.tab} ${
                            activeTab === idx ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab(idx)}
                    >
                        {f.ethnic}
                    </button>
                ))}
            </div>

            {/* Nội dung của tab đang chọn */}
            <div className={styles.content}>
                <div className={styles.cards}>
                    {festival[activeTab].festival.map((val, ide) => (
                        <div className={styles.card} key={ide}>
                            <div className={styles.cardContent}>
                                <div className={styles.header}>
                                    <img
                                        src={choose(
                                            ide,
                                            festival[activeTab].id_place
                                        )}
                                        alt={val.event}
                                    />
                                    <h5>{val.event}</h5>
                                </div>
                                <div className={styles.mainContent}>
                                    <h6>Địa điểm tổ chức</h6>
                                    <p>{val.place}</p>
                                </div>
                                <div className={styles.mainContent}>
                                    <h6>Thời gian tổ chức</h6>
                                    <p>{val.time}</p>
                                </div>
                                <div className={styles.mainContent}>
                                    <h6>Giới thiệu</h6>
                                    <p>{val.introduction}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
