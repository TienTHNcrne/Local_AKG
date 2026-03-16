/** @format */
import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./InforProvide.module.scss";
import clsx from "clsx";

// ── Danh sách 34 tỉnh thành SAU SÁP NHẬP ───────────────────
const PROVINCES = [
    "Hà Nội",
    "Huế",
    "Lai Châu",
    "Điện Biên",
    "Sơn La",
    "Lạng Sơn",
    "Quảng Ninh",
    "Thanh Hoá",
    "Nghệ An",
    "Hà Tĩnh",
    "Cao Bằng",
    "Tuyên Quang",
    "Lào Cai",
    "Thái Nguyên",
    "Phú Thọ",
    "Bắc Ninh",
    "Hưng Yên",
    "Hải Phòng",
    "Ninh Bình",
    "Quảng Trị",
    "Đà Nẵng",
    "Quảng Ngãi",
    "Gia Lai",
    "Khánh Hoà",
    "Lâm Đồng",
    "Đắk Lắk",
    "TP.HCM",
    "Đồng Nai",
    "Tây Ninh",
    "Cần Thơ",
    "Vĩnh Long",
    "Đồng Tháp",
    "Cà Mau",
    "An Giang",
];

// ── Tab config với icon ─────────────────────────────────────
const TABS = [
    { key: "overview", label: "Tổng quan" },
    { key: "climate", label: "Khí hậu" },
    { key: "history", label: "Lịch sử" },
    { key: "culture", label: "Văn hóa" },
    { key: "beliefs", label: "Tín ngưỡng" },
    { key: "food", label: "Ẩm thực" },
    { key: "festivals", label: "Lễ hội" },
];

const STATIC_CONTENT = {
    // AN GIANG (Hợp nhất An Giang + Kiên Giang)
    "An Giang:overview":
        "Diện tích ~13.000 km², dân số ~4,2 triệu. Trung tâm: Rạch Giá. 🌊 Kết hợp núi Sam, chợ nổi Châu Đốc với Phú Quốc, Hà Tiên.",

    "An Giang:climate":
        "Khí hậu nhiệt đới gió mùa. Miền Tây: mưa tháng 5-11 (2.000mm). Phú Quốc: khô tháng 11-4. Nhiệt độ 25-32°C. Thời điểm đẹp: tháng 12-4.",

    "An Giang:history":
        "Lịch sử khai hoang Nam Bộ + kháng chiến biên giới Tây Nam. Phú Quốc: nhà tù lịch sử. Bà Chúa Xứ Núi Sam: 1.000 năm linh thiêng.",

    "An Giang:culture":
        "Giao thoa 5 dân tộc: Kinh, Khmer, Hoa, Chăm, Khmer Krom. Đờn ca tài tử + đờn bầu Chăm + lễ Ok Om Bok Khmer.",

    "An Giang:beliefs":
        "Bà Chúa Xứ Núi Sam (3 triệu lượt/năm). Chùa Xiêm Cán Khmer. Thiền viện Trúc Lâm + nhà thờ Hà Tiên.",

    "An Giang:food":
        "Bún cá lóc Châu Đốc + nước mắm Phú Quốc. Gỏi sầu đâu, mắm prohok, tiêu Phú Quốc, rượu sim biển.",

    "An Giang:festivals":
        "Lễ Bà Chúa Xứ (4/4 âm lịch). Chol Chnam Thmay Khmer (13-15/4). Lễ hội Nghinh Ông Hà Tiên (15/8 âm lịch).",

    // CẦN THƠ (Hợp nhất Cần Thơ + Sóc Trăng + Hậu Giang)
    "Cần Thơ:overview":
        "Cần Thơ (mới) hợp nhất Cần Thơ + Sóc Trăng + Hậu Giang. Diện tích ~6.500 km², dân số ~4,8 triệu. Trung tâm: Cần Thơ. 🛶 Chợ nổi Cái Răng + rừng U Minh.",

    "Cần Thơ:climate":
        "Nhiệt đới gió mùa miền Tây. Mưa 1.800mm (tháng 6-11). Nhiệt độ 26-32°C. Đẹp nhất: tháng 12-4.",

    "Cần Thơ:history":
        "Khai phá Nam Kỳ Lục Tỉnh. Cần Thơ xưa: trung tâm thương mại sông Hậu. U Minh: căn cứ kháng chiến.",

    "Cần Thơ:culture":
        "Đờn ca tài tử + lễ hội Ok Om Bok. Khmer Sóc Trăng + chợ nổi Hậu Giang. Hò Huế trên sông.",

    "Cần Thơ:beliefs":
        "Chùa Dơi Sóc Trăng + chùa Ông (Khmer). Nhà thờ Cái Vồn. Miếu Bà Chúa Xứ Cần Thơ.",

    "Cần Thơ:food":
        "Lẩu mắm 7 loại + bánh cống. Bún nước lèo Sóc Trăng. Bánh xèo Hậu Giang + cá lóc nướng trui.",

    "Cần Thơ:festivals":
        "Chợ nổi Cái Răng (hàng ngày). Lễ Dolta Khmer (7/10 âm lịch). Tết Đoan Ngọ miền Tây (5/5).",

    // ĐÀ NẴNG (Hợp nhất Quảng Nam + Đà Nẵng)
    "Đà Nẵng:overview":
        "Diện tích ~11.500 km², dân số ~3,2 triệu. Trung tâm: Đà Nẵng. 🌉 Cầu Vàng + Hội An UNESCO.",

    "Đà Nẵng:climate":
        "Nhiệt đới gió mùa miền Trung. Mưa tháng 9-12 (2.500mm). Nhiệt độ 24-33°C. Đẹp: tháng 2-8.",

    "Đà Nẵng:history":
        "Cửa ngõ Đại Việt + cảng Tourane Pháp. Hội An: thương cảng 2.000 năm. Mỹ Sơn: thánh địa Chăm Pa.",

    "Đà Nẵng:culture":
        "Bài chòi Hội An + múa lân Đà Nẵng. Lễ hội pháo hoa quốc tế. Nghệ thuật điêu khắc Chăm.",

    "Đà Nẵng:beliefs":
        "Chùa Linh Ứng Bán Cầu. Hội Quán Phúc Kiến. Thánh địa Mỹ Sơn Chăm Pa.",

    "Đà Nẵng:food":
        "Mì Quảng + cao lầu Hội An. Bê thui Cầu Mống. Chè bắp Hội An + bánh tráng nướng.",

    "Đà Nẵng:festivals":
        "Festival Pháo hoa Quốc tế (tháng 6). Lễ hội Đèn lồng Hội An (14/1 âm lịch).",

    // TP.HCM (Hợp nhất TP.HCM + Bình Dương + Bà Rịa-Vũng Tàu)
    "TP.HCM:overview":
        "Diện tích ~5.300 km², dân số ~15 triệu. Trung tâm: TP.HCM. 🏙️ Thủ phủ kinh tế + Vũng Tàu biển.",

    "TP.HCM:climate":
        "Nhiệt đới gió mùa Nam Bộ. Mưa tháng 5-11 (1.900mm). Nhiệt độ 27-35°C. Đẹp: tháng 12-4.",

    "TP.HCM:history":
        "Gia Định xưa + Sài Gòn thuộc địa. Bình Dương: làng gốm + kháng chiến. Vũng Tàu: căn cứ Mỹ.",

    "TP.HCM:culture":
        "Hòa quyện 54 dân tộc + quốc tế. Đờn ca tài tử + nhạc bolero. Lễ hội đường phố hiện đại.",

    "TP.HCM:beliefs":
        "Chùa Vĩnh Nghiêm + Nhà thờ Đức Bà. Địa Tạng Bồ Tát Bình Dương. Tượng Chúa Kitô Vũng Tàu.",

    "TP.HCM:food":
        "Phở + bánh mì Sài Gòn. Gốm sứ Bình Dương. Hải sản Vũng Tàu + bún nước mắm.",

    "TP.HCM:festivals":
        "Tết hoa mai Sài Gòn. Lễ hội đường chạy Vũng Tàu. Festival ẩm thực Bình Dương.",

    // TUYÊN QUANG (Hợp nhất Tuyên Quang + Hà Giang)
    "Tuyên Quang:overview":
        "Diện tích ~13.000 km², dân số ~1,8 triệu. Trung tâm: Tuyên Quang. ⛰️ Cao nguyên đá Đồng Văn + Tân Trào cách mạng.",

    "Tuyên Quang:climate":
        "Nhiệt đới gió mùa núi. Mùa đông lạnh 10-15°C. Mưa 1.800mm (tháng 5-9). Đẹp: tháng 9-11.",

    "Tuyên Quang:history":
        "Tân Trào: Thủ đô kháng chiến 1945. Pác Bó: căn cứ Bác Hồ. Đồng Văn: biên giới lịch sử.",

    "Tuyên Quang:culture":
        "22 dân tộc: Tày, Dao, H'Mông, Nùng. Lồng bè Tày + then Dao + khèn H'Mông.",

    "Tuyên Quang:beliefs":
        "Pác Bó + Tân Trào cách mạng. Đền Hùng Tuyên Quang. Công viên địa chất Đồng Văn.",

    "Tuyên Quang:food":
        "Xôi ngũ sắc + thắng cố H'Mông. Cá hồi Na Hang + mèn mén Tày.",

    "Tuyên Quang:festivals":
        "Lễ hội Lồng Tồng (6/6 âm lịch). Chợ tình Khâu Vai. Lễ hội Then Tày.",
};

const InforProvide = () => {
    const [province, setProvince] = useState("An Giang");
    const [activeTab, setActiveTab] = useState("overview");
    const [content, setContent] = useState(STATIC_CONTENT);

    useEffect(() => {
        const cacheKey = `${province}:${activeTab}`;
        if (STATIC_CONTENT[cacheKey]) {
            setContent((prev) => ({
                ...prev,
                [cacheKey]: STATIC_CONTENT[cacheKey],
            }));
        }
    }, [province, activeTab]);

    const handleProvince = (prov) => {
        setProvince(prov);
        const cacheKey = `${prov}:${activeTab}`;
        if (STATIC_CONTENT[cacheKey]) {
            setContent((prev) => ({
                ...prev,
                [cacheKey]: STATIC_CONTENT[cacheKey],
            }));
        }
    };

    const handleTab = (tab) => {
        setActiveTab(tab);
        const cacheKey = `${province}:${tab}`;
        if (STATIC_CONTENT[cacheKey]) {
            setContent((prev) => ({
                ...prev,
                [cacheKey]: STATIC_CONTENT[cacheKey],
            }));
        }
    };

    const currentKey = `${province}:${activeTab}`;
    const currentContent = content[currentKey];
    const currentTab = TABS.find((t) => t.key === activeTab);

    return (
        <div className={styles.page}>
            {/* ── HEADER ────────────────────────────────────── */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.logo}>🇻🇳</span>
                    <div>
                        <h1 className={styles.title}>34 Tỉnh Thành Mới</h1>
                        <p className={styles.subtitle}>
                            Cập nhật sáp nhập hành chính 2026
                        </p>
                    </div>
                </div>

                <div className={styles.selectWrap}>
                    <select
                        className={styles.select}
                        value={province}
                        onChange={(e) => handleProvince(e.target.value)}
                    >
                        {PROVINCES.map((p) => (
                            <option key={p} value={p}>
                                {p}{" "}
                            </option>
                        ))}
                    </select>
                    <span className={styles.selectChevron}>▾</span>
                </div>
            </header>

            {/* ── BODY ──────────────────────────────────────── */}
            <div className={styles.body}>
                {/* SIDEBAR TABS */}
                <nav className={styles.nav}>
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            className={clsx(styles.navBtn, {
                                [styles.navActive]: activeTab === t.key,
                            })}
                            onClick={() => handleTab(t.key)}
                        >
                            <span className={styles.navIcon}>{t.icon}</span>
                            <span className={styles.navLabel}>{t.label}</span>
                            {activeTab === t.key && (
                                <span className={styles.navBar} />
                            )}
                        </button>
                    ))}
                </nav>

                {/* CONTENT AREA */}
                <main className={styles.contentArea}>
                    {/* Section title + thông tin sáp nhập */}
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionIcon}>
                            {currentTab?.icon}
                        </span>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                {currentTab?.label} — {province}
                            </h2>
                        </div>
                    </div>

                    {/* Nội dung */}
                    {currentContent ? (
                        <div className={styles.article}>
                            {currentContent.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className={styles.paragraph}
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                    dangerouslySetInnerHTML={{ __html: para }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>
                                Nội dung <strong>{currentTab?.label}</strong>{" "}
                                của <strong>{province}</strong> đang cập nhật
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default InforProvide;
