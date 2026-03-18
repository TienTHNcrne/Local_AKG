/** @format */
import React, { useEffect, useState, useRef } from "react";
import styles from "./Row1.module.scss";
import { useNavigate } from "react-router-dom";
import TourAi from "../../Auth/Profile/components/Tours/components/TourAi/TourAi";

export default function Row1() {
    const [add, setAdd] = useState(false);
    const [picture, setPicture] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const navigate = useNavigate();
    const slideshowRef = useRef(null);

    useEffect(() => {
        const images = import.meta.glob(
            "../../../assets/Cloudinary_Archive_2026-01-10_01_37_32_Originals/*.{png,jpg,jpeg,webp}",
            { eager: true },
        );
        const imageArray = Object.values(images).map((img) => img.default);
        setPicture(imageArray.slice(0, 8));
    }, []);

    useEffect(() => {
        if (picture.length === 0 || !isPlaying) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) =>
                prev === picture.length - 1 ? 0 : prev + 1,
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [picture.length, isPlaying]);

    return (
        <div className={styles.container}>
            {add && <TourAi setHide={setAdd} />}

            <div className={styles.top}>
                {/* LEFT */}
                <div className={styles.left}>
                    <div className={styles.badge}>Nền tảng du lịch số</div>

                    <h1 className={styles.heading}>
                        <span className={styles.brand}>AGiLand</span>
                        <br />
                        Bản đồ du lịch số của{" "}
                        <span className={styles.vn}>Việt Nam</span>
                    </h1>

                    <p className={styles.desc}>
                        Kết hợp Digital Twin và dữ liệu du lịch để xây dựng "bản
                        sao số" cho địa phương — giúp du khách đi đúng chỗ,
                        chính quyền ra quyết định đúng thời điểm.
                    </p>

                    <div className={styles.stats}>
                        {[
                            { num: "20+", label: "Tỉnh thành" },
                            { num: "1", label: "Nền tảng" },
                            { num: "∞", label: "Hành trình" },
                        ].map((s) => (
                            <div key={s.label} className={styles.statItem}>
                                <span className={styles.statNum}>{s.num}</span>
                                <span className={styles.statLabel}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — slideshow */}
                <div className={styles.right} ref={slideshowRef}>
                    {picture.length > 0 && (
                        <img
                            key={currentImageIndex}
                            src={picture[currentImageIndex]}
                            className={styles.slideImg}
                            alt={`An Giang ${currentImageIndex + 1}`}
                        />
                    )}
                    <div className={styles.dots}>
                        {picture.map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.dot} ${i === currentImageIndex ? styles.dotActive : ""}`}
                                onClick={() => setCurrentImageIndex(i)}
                                aria-label={`Ảnh ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA buttons */}
            <div className={styles.bottom}>
                <button
                    className={`${styles.btn} ${styles.btnMap}`}
                    onClick={() => navigate("/Explore/map")}
                >
                    <span className={styles.btnGlow} />
                    <span className={styles.btnIcon}>🗺️</span>
                    <span className={styles.btnText}>
                        <span className={styles.btnTitle}>
                            Bản đồ tương tác
                        </span>
                        <span className={styles.btnSub}>
                            Định vị & tìm đường đi
                        </span>
                    </span>
                </button>

                <button
                    className={`${styles.btn} ${styles.btnTour}`}
                    onClick={() => setAdd(true)}
                >
                    <span className={styles.btnGlow} />
                    <span className={styles.btnIcon}>🧭</span>
                    <span className={styles.btnText}>
                        <span className={styles.btnTitle}>Dựng hành trình</span>
                        <span className={styles.btnSub}>
                            Lên kế hoạch chuyến đi
                        </span>
                    </span>
                    <span className={styles.btnBadge}>AI</span>
                </button>
            </div>
        </div>
    );
}
