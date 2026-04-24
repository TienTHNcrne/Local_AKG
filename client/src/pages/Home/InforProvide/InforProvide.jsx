/** @format */
import React, { useState, useMemo } from "react";
import styles from "./InforProvide.module.scss";
import clsx from "clsx";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

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

const TABS = [
    { key: "overview", label: "Tổng quan" },
    { key: "climate", label: "Khí hậu" },
    { key: "history", label: "Lịch sử" },
    { key: "culture", label: "Văn hóa" },
    { key: "beliefs", label: "Tín ngưỡng" },
    { key: "food", label: "Ẩm thực" },
    { key: "festivals", label: "Lễ hội" },
];

const PROVINCE_DATA = {
    "An Giang": {
        stats: {
            area: "13.000",
            pop: "4,2 triệu",
            center: "Rạch Giá",
            region: "Miền Tây",
            merged: "An Giang + Kiên Giang",
        },
        content: {
            overview:
                "Diện tích ~13.000 km², dân số ~4,2 triệu. Trung tâm: Rạch Giá.\n\nKết hợp núi Sam, chợ nổi Châu Đốc với Phú Quốc, Hà Tiên.",
        },
    },
};

const REGION_STYLES = {
    "Miền Tây": { bg: "#ecfdf5", text: "#065f46", dot: "#10b981" },
};

const DEFAULT_STATS = {
    area: "—",
    pop: "—",
    center: "—",
    region: "—",
    merged: "Đang cập nhật",
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function InforProvide() {
    const [province, setProvince] = useState("An Giang");
    const [activeTab, setActiveTab] = useState("overview");

    const data = useMemo(() => {
        const prov = PROVINCE_DATA[province];
        return {
            stats: prov?.stats || DEFAULT_STATS,
            content: prov?.content?.[activeTab] || null,
            regionStyle:
                REGION_STYLES[prov?.stats?.region] || REGION_STYLES["Miền Tây"],
        };
    }, [province, activeTab]);

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
        setActiveTab("overview");
    };

    const currentTab = TABS.find((t) => t.key === activeTab);

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        Cập nhật sáp nhập hành chính 2026
                    </div>
                    <h1 className={styles.heroTitle}>34 Tỉnh Thành Mới</h1>
                    <p className={styles.heroSub}>
                        Khám phá thông tin địa lý, văn hóa và con người của các
                        tỉnh thành
                    </p>
                </div>

                {/* Province Selector */}
                <div className={styles.selectorBlock}>
                    <label className={styles.selectorLabel}>
                        Chọn tỉnh thành
                    </label>
                    <div className={styles.selectWrap}>
                        <select
                            className={styles.select}
                            value={province}
                            onChange={handleProvinceChange}
                        >
                            {PROVINCES.map((p) => (
                                <option key={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <div>
                        <p className={styles.statValue}>
                            {data.stats.area} km²
                        </p>
                        <p className={styles.statLabel}>Diện tích</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div>
                        <p className={styles.statValue}>{data.stats.pop}</p>
                        <p className={styles.statLabel}>Dân số</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div>
                        <p className={styles.statValue}>{data.stats.center}</p>
                        <p className={styles.statLabel}>Trung tâm</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div>
                        <p className={styles.statValue}>{data.stats.merged}</p>
                        <p className={styles.statLabel}>Sáp nhập từ</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <span
                        className={styles.regionBadge}
                        style={{
                            background: data.regionStyle.bg,
                            color: data.regionStyle.text,
                        }}
                    >
                        <span
                            style={{ background: data.regionStyle.dot }}
                            className={styles.regionDot}
                        />
                        {data.stats.region}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.body}>
                {/* Navigation */}
                <nav className={styles.nav}>
                    <p className={styles.navHeading}>Chuyên mục</p>
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            className={clsx(styles.navBtn, {
                                [styles.navActive]: activeTab === tab.key,
                            })}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            <span className={styles.navLabel}>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Content Area */}
                <main className={styles.contentArea}>
                    <div className={styles.sectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                {currentTab?.label}
                            </h2>
                            <p className={styles.sectionProv}>{province}</p>
                        </div>
                    </div>

                    {data.content ? (
                        <div className={styles.article}>
                            {data.content
                                .split("\n\n")
                                .map((paragraph, idx) => (
                                    <p key={idx} className={styles.paragraph}>
                                        {paragraph}
                                    </p>
                                ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>
                                <strong>Nội dung đang cập nhật...</strong>
                            </p>
                            <p>
                                Chúng tôi đang bổ sung thêm thông tin cho tỉnh
                                này.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
