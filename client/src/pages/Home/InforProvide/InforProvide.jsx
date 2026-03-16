/** @format */
import React, { useState, useCallback, useRef } from "react";
import styles from "./InforProvide.module.scss";
import clsx from "clsx";

// ── Danh sách tỉnh thành Việt Nam ──────────────────────────
const PROVINCES = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lạng Sơn",
    "Lào Cai",
    "Lâm Đồng",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP. Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
];

// ── Tab config ────────────────────────────────────────────
const TABS = [
    { key: "overview", label: "Tổng quan" },
    { key: "climate", label: "Khí hậu" },
    { key: "history", label: "Lịch sử" },
    { key: "culture", label: "Văn hóa" },
    { key: "beliefs", label: "Tín ngưỡng" },
    { key: "food", label: "Ẩm thực" },
    { key: "festivals", label: "Lễ hội" },
];

const SYSTEM_PROMPT = `Bạn là chuyên gia du lịch và văn hóa Việt Nam.
Trả lời bằng tiếng Việt, văn phong sinh động, dễ đọc như tạp chí du lịch.
Mỗi phần nên có 3-5 đoạn chi tiết, phong phú, hấp dẫn.
Không dùng markdown heading (##). Có thể dùng emoji để làm nổi bật.
Trả lời trực tiếp nội dung, không cần lời mở đầu.`;

const TAB_PROMPTS = {
    overview: (p) =>
        `Viết tổng quan về tỉnh ${p}: vị trí địa lý, diện tích, dân số, đặc điểm nổi bật, điểm độc đáo so với các tỉnh khác.`,
    climate: (p) =>
        `Mô tả chi tiết khí hậu tỉnh ${p}: mùa mưa, mùa khô, nhiệt độ trung bình, những lưu ý thời tiết cho du khách, thời điểm lý tưởng để tham quan.`,
    history: (p) =>
        `Kể về lịch sử hình thành và phát triển tỉnh ${p}: từ thời khai hoang đến nay, các sự kiện quan trọng, nhân vật lịch sử nổi bật.`,
    culture: (p) =>
        `Mô tả văn hóa đặc sắc của tỉnh ${p}: các dân tộc sinh sống, phong tục tập quán, nghề thủ công truyền thống, trang phục, âm nhạc dân gian.`,
    beliefs: (p) =>
        `Giới thiệu về tín ngưỡng và tôn giáo tại tỉnh ${p}: các ngôi đền chùa nổi tiếng, lễ nghi quan trọng, tín ngưỡng dân gian đặc trưng.`,
    food: (p) =>
        `Giới thiệu ẩm thực đặc sản của tỉnh ${p}: các món ăn nổi tiếng nhất, nơi thưởng thức ngon, đặc sản mang về làm quà, văn hóa ăn uống địa phương.`,
    attractions: (p) =>
        `Liệt kê và mô tả chi tiết các địa điểm du lịch nổi bật tại tỉnh ${p}: cảnh quan thiên nhiên, di tích lịch sử, điểm check-in hot, kinh nghiệm tham quan.`,
    festivals: (p) =>
        `Mô tả các lễ hội và sự kiện văn hóa tiêu biểu của tỉnh ${p}: thời gian tổ chức, nghi thức đặc trưng, ý nghĩa, cách tham gia cho du khách.`,
    economy: (p) =>
        `Phân tích kinh tế tỉnh ${p}: các ngành kinh tế chủ lực, nông sản đặc trưng, khu công nghiệp, tiềm năng phát triển, thu nhập bình quân.`,
    transport: (p) =>
        `Hướng dẫn cách di chuyển đến và trong tỉnh ${p}: từ các thành phố lớn, phương tiện phổ biến, chi phí ước tính, mẹo di chuyển tiết kiệm.`,
};

// ── Component ─────────────────────────────────────────────
export default function InforProvide() {
    const [province, setProvince] = useState("An Giang");
    const [activeTab, setActiveTab] = useState("overview");
    const [content, setContent] = useState({}); // { "An Giang:overview": "...", ... }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortRef = useRef(null);

    // ── Fetch từ Anthropic API (streaming) ──────────────────
    const fetchContent = useCallback(
        async (prov, tab) => {
            const cacheKey = `${prov}:${tab}`;
            if (content[cacheKey]) return; // đã có cache

            // Hủy request cũ nếu đang chạy
            if (abortRef.current) abortRef.current.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            setLoading(true);
            setError(null);
            // okekeekekek
            try {
                const res = await fetch(
                    "https://api.anthropic.com/v1/messages",
                    {
                        method: "POST",
                        signal: controller.signal,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            model: "claude-sonnet-4-20250514",
                            max_tokens: 1000,
                            system: SYSTEM_PROMPT,
                            messages: [
                                {
                                    role: "user",
                                    content: TAB_PROMPTS[tab](prov),
                                },
                            ],
                            stream: true,
                        }),
                    },
                );

                if (!res.ok) throw new Error(`API error ${res.status}`);

                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let accumulated = "";

                // stream SSE
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (!line.startsWith("data:")) continue;
                        const raw = line.slice(5).trim();
                        if (raw === "[DONE]") break;
                        try {
                            const json = JSON.parse(raw);
                            if (
                                json.type === "content_block_delta" &&
                                json.delta?.text
                            ) {
                                accumulated += json.delta.text;
                                // update realtime
                                setContent((prev) => ({
                                    ...prev,
                                    [cacheKey]: accumulated,
                                }));
                            }
                        } catch {
                            /* ignore parse errors */
                        }
                    }
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Không thể tải nội dung. Vui lòng thử lại.");
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        },
        [content],
    );

    // ── Handlers ─────────────────────────────────────────────
    const handleProvince = (prov) => {
        setProvince(prov);
        const cacheKey = `${prov}:${activeTab}`;
        if (!content[cacheKey]) fetchContent(prov, activeTab);
    };

    const handleTab = (tab) => {
        setActiveTab(tab);
        const cacheKey = `${province}:${tab}`;
        if (!content[cacheKey]) fetchContent(province, tab);
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
                        <h1 className={styles.title}>Khám phá Việt Nam</h1>
                        <p className={styles.subtitle}>
                            Thông tin chi tiết từng tỉnh thành
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
                                {p}
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
                    {/* Section title */}
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionIcon}>
                            {currentTab?.icon}
                        </span>
                        <h2 className={styles.sectionTitle}>
                            {currentTab?.label} — {province}
                        </h2>
                    </div>

                    {/* States */}
                    {!currentContent && !loading && !error && (
                        <div className={styles.emptyState}>
                            <p>
                                Nhấn để tải thông tin về{" "}
                                <strong>{currentTab?.label}</strong> của{" "}
                                <strong>{province}</strong>
                            </p>
                            <button
                                className={styles.loadBtn}
                                onClick={() =>
                                    fetchContent(province, activeTab)
                                }
                            >
                                Tải nội dung
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className={styles.errorState}>
                            {error}
                            <button
                                onClick={() =>
                                    fetchContent(province, activeTab)
                                }
                            >
                                Thử lại
                            </button>
                        </div>
                    )}

                    {/* Text content — hiện dần khi streaming */}
                    {currentContent && (
                        <div className={styles.article}>
                            {currentContent.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className={styles.paragraph}
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                >
                                    {para}
                                </p>
                            ))}
                            {loading && <span className={styles.cursor} />}
                        </div>
                    )}

                    {/* Skeleton khi đang load lần đầu */}
                    {loading && !currentContent && (
                        <div className={styles.skeleton}>
                            {[100, 90, 95, 80, 100, 70].map((w, i) => (
                                <div
                                    key={i}
                                    className={styles.skeletonLine}
                                    style={{
                                        width: `${w}%`,
                                        animationDelay: `${i * 0.1}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
