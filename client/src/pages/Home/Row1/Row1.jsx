import React, { useEffect, useState } from "react";
import styles from "./Row1.module.scss";
import { useNavigate } from "react-router-dom";

export default function Row1() {
    const [picture, setPicture] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const images = import.meta.glob(
            "../../../assets/Cloudinary_Archive_2026-01-10_01_37_32_Originals/*.{png,jpg,jpeg,webp}",
            { eager: true },
        );

        const imageArray = Object.values(images).map((img) => img.default);

        setPicture(imageArray.slice(0, 8));
    }, []);

    const images = [...picture, ...picture];

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {/* ---------- LEFT ---------- */}
                <div className={styles.left}>
                    <h1>
                        Khám phá vùng đất <strong>An Giang</strong>
                    </h1>
                    <p>
                        AGiland là website du lịch, mở ra cánh cửa đến với tỉnh
                        An Giang hợp nhất.
                    </p>
                    <p>
                        Với sự kết hợp của vùng đất bảy núi huyền bí và vùng
                        biển Tây Nam trù phú, du khách có thể khám phá các tuyến
                        du lịch tâm linh, sinh thái và ẩm thực đặc trưng miền
                        Tây.
                    </p>
                    <p>
                        Hãy truy cập ngay để lên kế hoạch cho chuyến đi An Giang
                        đầy mới mẻ và hấp dẫn!
                    </p>
                </div>

                {/* ---------- RIGHT ---------- */}
                <div className={styles.right}>
                    {[styles.down, styles.up, styles.down].map(
                        (dir, colIndex) => (
                            <div className={styles.col} key={colIndex}>
                                <div className={`${styles.track} ${dir}`}>
                                    {images.map((src, i) => (
                                        <img
                                            key={`${colIndex}-${i}`}
                                            src={src}
                                            className={styles.image}
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>

            {/* ---------- BOTTOM ---------- */}
            <div className={styles.bottom}>
                <button className={styles.button}>Tinh hoa An Giang</button>

                <button
                    className={styles.button}
                    onClick={() => navigate("/Explore/map")}
                >
                    Bản đồ tương tác
                </button>

                <button className={styles.button}>Dựng hành trình</button>
            </div>
        </div>
    );
}
