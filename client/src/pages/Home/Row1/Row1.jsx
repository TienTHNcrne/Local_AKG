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
    const infinityIcon = new URL(
        "../../../assets/infinity.png",
        import.meta.url,
    ).href;
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
                        <strong>AGiLand</strong> – Bản đồ du lịch số của{" "}
                        <strong className={styles.VN}>Việt Nam</strong>{" "}
                    </h1>

                    <div className={styles.description}>
                        <p>
                            AGiLand kết hợp Digital Twin và dữ liệu du lịch để
                            xây dựng các “bản sao số” cho địa phương, giúp du
                            khách đi đúng chỗ – chính quyền ra quyết định đúng
                            thời điểm.
                        </p>
                        <p>
                            Một nền tảng – nhiều vùng đất – vô hạn hành trình.
                        </p>
                    </div>

                    {/* Quick stats */}
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>20+</span>
                            <span className={styles.statLabel}>Tỉnh thành</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>1</span>
                            <span className={styles.statLabel}>Nền tảnh</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>oo </span>
                            <span className={styles.statLabel}>Hành trình</span>
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
