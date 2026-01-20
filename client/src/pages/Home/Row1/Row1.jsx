import React, { useEffect, useState, useRef } from "react";
import styles from "./Row1.module.scss";
import { useNavigate } from "react-router-dom";
import TourAi from "../../Profile/components/Tours/components/TourAi/TourAi";
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

    // Tự động chuyển ảnh
    useEffect(() => {
        if (picture.length === 0 || !isPlaying) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === picture.length - 1 ? 0 : prevIndex + 1,
            );
        }, 4000); // Chuyển ảnh mỗi 4 giây

        return () => clearInterval(interval);
    }, [picture.length, isPlaying]);

    return (
        <div className={styles.container}>
            {" "}
            {add && <TourAi setHide={setAdd} />}
            <div className={styles.top}>
                {/* ---------- LEFT - CONTENT ---------- */}
                <div className={styles.left}>
                    <h1>
                        Khám phá vùng đất <strong>An Giang</strong>
                    </h1>
                    <p className={styles.lead}>
                        AGiland là website du lịch, mở ra cánh cửa đến với tỉnh
                        An Giang hợp nhất.
                    </p>
                    <div className={styles.description}>
                        <p>
                            Với sự kết hợp của vùng đất bảy núi huyền bí và vùng
                            biển Tây Nam trù phú, du khách có thể khám phá các
                            tuyến du lịch tâm linh, sinh thái và ẩm thực đặc
                            trưng miền Tây.
                        </p>
                        <p>
                            Hãy truy cập ngay để lên kế hoạch cho chuyến đi An
                            Giang đầy mới mẻ và hấp dẫn!
                        </p>
                    </div>

                    {/* Quick stats */}
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>7</span>
                            <span className={styles.statLabel}>
                                Núi huyền bí
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Điểm đến</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>
                                Món ăn đặc sản
                            </span>
                        </div>
                    </div>
                </div>

                {/* ---------- RIGHT - FULLSCREEN SLIDESHOW ---------- */}
                <div className={styles.right}>
                    <div
                        className={styles.slideshowContainer}
                        ref={slideshowRef}
                    >
                        {/* Ảnh chính SIÊU TO */}
                        <div className={styles.mainImageContainer}>
                            {picture.length > 0 && (
                                <div className={styles.mainImageWrapper}>
                                    <img
                                        src={picture[currentImageIndex]}
                                        className={styles.mainImage}
                                        alt={`An Giang landscape ${currentImageIndex + 1}`}
                                    />

                                    {/* Overlay gradient */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------- BOTTOM ---------- */}
            <div className={styles.bottom}>
                <button className={`${styles.button} ${styles.primary}`}>
                    <span className={styles.icon}>🏞️</span>
                    <div
                        className={styles.buttonContent}
                        onClick={() => navigate("/Explore/TinhHoa")}
                    >
                        <span className={styles.buttonTitle}>
                            Tinh hoa An Giang
                        </span>
                        <span className={styles.buttonSubtitle}>
                            Khám phá văn hóa & ẩm thực
                        </span>
                    </div>
                </button>

                <button
                    className={`${styles.button} ${styles.secondary}`}
                    onClick={() => navigate("/Explore/map")}
                >
                    <span className={styles.icon}>🗺️</span>
                    <div className={styles.buttonContent}>
                        <span className={styles.buttonTitle}>
                            Bản đồ tương tác
                        </span>
                        <span className={styles.buttonSubtitle}>
                            Định vị & tìm đường đi
                        </span>
                    </div>
                </button>

                <button
                    className={`${styles.button} ${styles.tertiary}`}
                    onClick={() => setAdd(true)}
                >
                    <span className={styles.icon}>🧭</span>
                    <div className={styles.buttonContent}>
                        <span className={styles.buttonTitle}>
                            Dựng hành trình
                        </span>
                        <span className={styles.buttonSubtitle}>
                            Lên kế hoạch chuyến đi
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}
