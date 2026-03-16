/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./exp.module.scss";
import clsx from "clsx";

// ── Mock data ─────────────────────────────────────────────────
export const MOCK_EXP = [
    {
        _id: "1",
        name: "Công ty TNHH thương mại dịch vụ du lịch tàu thuyền Thuận Mẫn phục",
        description:
            "An toàn, chu đáo, ân cần, phục vụ tận tình với nhiều loại hình trải nghiệm biển độc đáo.",
        address: "Số 7 đường chữ T, Khu phố 3, Phường Hà Tiên, Tỉnh Kiên Giang",
        category: "adventure",
        price: 0,
        rating: 4.5,
        reviewCount: 38,
        hours: { open: "06:00", close: "18:00", note: "Hàng ngày" },
        mapUrl: "https://maps.google.com/?q=10.3814806,104.4428275",
        images: [
            "/imageservices/1.jpg",
            "/imageservices/2.jpg",
            "/imageservices/3.jpg",
            "/imageservices/4.jpg",
            "/imageservices/5.jpg",
        ],
        services: [
            "Phao chuối 100k/người",
            "Phao bay 150k/người",
            "Phao sopha 150k/người",
            "Phao vịt 150k/người",
            "Dù bay 1.3tr/cặp",
            "Flycam 300–400k/lượt quay",
            "Mô tô nước 500k/15 phút",
            "Chèo thuyền kayak 100k/giờ",
            "Lặn ngắm san hô 250k/người",
        ],
        contact: {
            name: "Thanh Nguyệt",
            phone: "0896733383",
            avatar: null,
            qr: null,
            zalo: "https://zalo.me/0896733383",
        },
    },
    {
        _id: "1",
        name: "Nhà hàng khách sạn Hải Đăng – Khu du lịch Mũi Nai",
        description:
            "An toàn, chu đáo, ân cần.  tận tình với nhiều loại hình trải nghiệm biển độc đáo.",
        address: "Số 7 đường chữ T, Khu phố 3, Phường Hà Tiên, Tỉnh Kiên Giang",
        category: "adventure",
        price: 0,
        rating: 4.5,
        reviewCount: 38,
        hours: { open: "06:00", close: "18:00", note: "Hàng ngày" },
        mapUrl: "https://maps.google.com/?q=10.3814806,104.4428275",
        images: [
            "/imageservices/2.jpg",

            "/imageservices/1.jpg",
            "/imageservices/3.jpg",
            "/imageservices/4.jpg",
            "/imageservices/5.jpg",
        ],
        services: [
            "Phao chuối 100k/người",
            "Phao bay 150k/người",
            "Phao sopha 150k/người",
            "Phao vịt 150k/người",
            "Dù bay 1.3tr/cặp",
            "Flycam 300–400k/lượt quay",
            "Mô tô nước 500k/15 phút",
            "Chèo thuyền kayak 100k/giờ",
            "Lặn ngắm san hô 250k/người",
        ],
        contact: {
            name: "Thanh Nguyệt",
            phone: "0896733383",
            avatar: null,
            qr: null,
            zalo: "https://zalo.me/0896733383",
        },
    },
];

// ── Star Rating ───────────────────────────────────────────────
function StarRating({ rating = 0, count = 0 }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <div className={styles.rating}>
            <span className={styles.ratingStars}>
                {"★".repeat(full)}
                {half ? "½" : ""}
                {"☆".repeat(empty)}
            </span>
            <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
            {count > 0 && (
                <span className={styles.ratingCount}>({count} đánh giá)</span>
            )}
        </div>
    );
}

// ── Hours ─────────────────────────────────────────────────────
function HoursRow({ hours }) {
    if (!hours) return null;
    const now = new Date();
    const hhmm = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const isOpen =
        hhmm >= (hours.open ?? "00:00") && hhmm < (hours.close ?? "23:59");
    return (
        <div className={styles.hoursRow}>
            <span
                className={clsx(
                    styles.hoursStatus,
                    isOpen ? styles.hoursOpen : styles.hoursClosed,
                )}
            >
                {isOpen ? "Đang mở" : "Đã đóng"}
            </span>
            <span className={styles.hoursTime}>
                {hours.open} – {hours.close}
            </span>
            {hours.note && (
                <span className={styles.hoursNote}>{hours.note}</span>
            )}
        </div>
    );
}

// ── Address ───────────────────────────────────────────────────
function AddressRow({ address, mapUrl }) {
    if (!address) return null;
    return (
        <div className={styles.addressRow}>
            <span className={styles.addressIcon}>📍</span>
            <span className={styles.addressText}>{address}</span>
            {mapUrl && (
                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.mapLink}
                >
                    🗺️ Bản đồ
                </a>
            )}
        </div>
    );
}

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
    const [idx, setIdx] = useState(startIndex);
    useEffect(() => {
        const h = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft")
                setIdx((i) => (i - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [images.length, onClose]);

    return (
        <div className={styles.lightboxOverlay} onClick={onClose}>
            <button className={styles.lbClose} onClick={onClose}>
                ✕
            </button>
            <button
                className={styles.lbPrev}
                onClick={(e) => {
                    e.stopPropagation();
                    setIdx((i) => (i - 1 + images.length) % images.length);
                }}
            >
                ‹
            </button>
            <img
                className={styles.lbImg}
                src={images[idx]}
                alt=""
                onClick={(e) => e.stopPropagation()}
            />
            <button
                className={styles.lbNext}
                onClick={(e) => {
                    e.stopPropagation();
                    setIdx((i) => (i + 1) % images.length);
                }}
            >
                ›
            </button>
            <div className={styles.lbDots}>
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={clsx(styles.lbDot, {
                            [styles.lbDotActive]: i === idx,
                        })}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIdx(i);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Image Gallery ─────────────────────────────────────────────
function ImageGallery({ images = [] }) {
    const [lightbox, setLightbox] = useState(null);
    if (!images.length)
        return (
            <div className={styles.imgPlaceholder}>
                <span>🏖️</span>
            </div>
        );
    const main = images[0];
    const thumbs = images.slice(1, 4);
    const remaining = images.length - 4;
    return (
        <>
            <div className={styles.gallery}>
                <div
                    className={styles.galleryMain}
                    onClick={() => setLightbox(0)}
                >
                    <img src={main} alt="" loading="lazy" />
                </div>
                {thumbs.length > 0 && (
                    <div className={styles.galleryThumbs}>
                        {thumbs.map((img, i) => (
                            <div
                                key={i}
                                className={styles.galleryThumb}
                                onClick={() => setLightbox(i + 1)}
                            >
                                <img src={img} alt="" loading="lazy" />
                                {i === thumbs.length - 1 && remaining > 0 && (
                                    <div className={styles.galleryMore}>
                                        +{remaining + 1}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {lightbox !== null && (
                <Lightbox
                    images={images}
                    startIndex={lightbox}
                    onClose={() => setLightbox(null)}
                />
            )}
        </>
    );
}

// ── Service Tags với chế độ thu gọn ──────────────────────────────
function ServiceTags({ services = [] }) {
    const [expanded, setExpanded] = useState(false);

    if (!services.length) return null;

    const MAX_VISIBLE = 3; // Chỉ hiển thị 3 service đầu tiên khi thu gọn
    const visibleServices = expanded
        ? services
        : services.slice(0, MAX_VISIBLE);
    const hasMore = services.length > MAX_VISIBLE;

    return (
        <div className={styles.services}>
            <div className={styles.servicesGrid}>
                {visibleServices.map((s, i) => (
                    <span key={i} className={styles.serviceTag}>
                        {s}
                    </span>
                ))}
            </div>

            {hasMore && (
                <button
                    className={styles.servicesToggle}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? (
                        <>Thu gọn ↑</>
                    ) : (
                        <>+{services.length - MAX_VISIBLE} dịch vụ khác ↓</>
                    )}
                </button>
            )}
        </div>
    );
}

// ── Contact Card ──────────────────────────────────────────────
function ContactCard({ contact }) {
    if (!contact) return null;
    return (
        <div className={styles.contactCard}>
            <div className={styles.contactInfo}>
                {contact.avatar ? (
                    <img
                        src={contact.avatar}
                        className={styles.contactAvatar}
                        alt=""
                    />
                ) : (
                    <div className={styles.contactAvatarFallback}>
                        {contact.name?.[0] ?? "?"}
                    </div>
                )}
                <div>
                    <p className={styles.contactName}>{contact.name}</p>
                    <p className={styles.contactPhone}>{contact.phone}</p>
                </div>
                {contact.qr && (
                    <img
                        src={contact.qr}
                        className={styles.contactQr}
                        alt="QR"
                    />
                )}
            </div>
            <div className={styles.contactActions}>
                {contact.phone && (
                    <a
                        href={`tel:${contact.phone}`}
                        className={styles.contactBtn}
                    >
                        📞 Gọi ngay
                    </a>
                )}
                {contact.zalo && (
                    <a
                        href={contact.zalo}
                        target="_blank"
                        rel="noreferrer"
                        className={clsx(
                            styles.contactBtn,
                            styles.contactBtnSecondary,
                        )}
                    >
                        💬 Nhắn Zalo
                    </a>
                )}
            </div>
        </div>
    );
}

// ── Exp Card ──────────────────────────────────────────────────
function ExpCard({ item }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <article className={styles.card}>
            <ImageGallery
                images={item.images ?? (item.image ? [item.image] : [])}
            />

            {item.category && (
                <span className={styles.categoryBadge}>{item.category}</span>
            )}

            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.name}</h3>

                <HoursRow hours={item.hours} />

                {item.description && (
                    <p
                        className={clsx(styles.desc, {
                            [styles.descExpanded]: expanded,
                        })}
                    >
                        {item.description}
                    </p>
                )}
                {item.description?.length > 120 && (
                    <button
                        className={styles.readMore}
                        onClick={() => setExpanded((v) => !v)}
                    >
                        {expanded ? "Thu gọn ↑" : "Xem thêm ↓"}
                    </button>
                )}

                <ServiceTags services={item.services ?? []} />

                {item.price != null && (
                    <div className={styles.priceRow}>
                        {item.price > 0 ? (
                            <>
                                {item.price.toLocaleString()}đ
                                {item.unit && (
                                    <span className={styles.priceUnit}>
                                        / {item.unit}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className={styles.priceFree}>Miễn phí</span>
                        )}
                    </div>
                )}

                <ContactCard contact={item.contact} />

                <button className={styles.bookBtn}>Đặt trải nghiệm</button>
            </div>
        </article>
    );
}

// ── Page ──────────────────────────────────────────────────────
export default function Exp() {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/play/getAll`,
                );
                setData(res.data);
            } catch {
                setData(MOCK_EXP);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const normalize = (s = "") =>
        s
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const filtered = data.filter((item) => {
        const key = normalize(keyword);
        const match =
            normalize(item.name).includes(key) ||
            normalize(item.description ?? "").includes(key) ||
            normalize(item.address ?? "").includes(key);
        const matchType =
            type === "all" || normalize(item.category) === normalize(type);
        return match && matchType;
    });

    return (
        <div className={styles.page}>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroBubble} />
                <div className={styles.heroBubble} />
                <div className={styles.heroBubble} />
                <div className={styles.heroBubble} />

                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Trải nghiệm</h1>
                </div>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        className={styles.searchInput}
                        placeholder="Tìm tour, hoạt động, địa chỉ..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {keyword && (
                        <button
                            className={styles.searchClear}
                            onClick={() => setKeyword("")}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className={styles.filterTabs}>
                    {[
                        { value: "all", label: "Tất cả" },
                        { value: "nature", label: "🌿 Thiên nhiên" },
                        { value: "culture", label: "🏛️ Văn hóa" },
                        { value: "adventure", label: "🏄 Mạo hiểm" },
                        { value: "workshop", label: "🎨 Workshop" },
                    ].map((t) => (
                        <button
                            key={t.value}
                            className={clsx(styles.filterTab, {
                                [styles.filterTabActive]: type === t.value,
                            })}
                            onClick={() => setType(t.value)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className={styles.skeletonGrid}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImg} />
                            <div className={styles.skeletonBody}>
                                <div
                                    className={styles.skeletonLine}
                                    style={{ width: "65%" }}
                                />
                                <div
                                    className={styles.skeletonLine}
                                    style={{ width: "85%" }}
                                />
                                <div
                                    className={styles.skeletonLine}
                                    style={{ width: "50%" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className={styles.empty}>
                    <span>🌊</span>
                    <p>Không có trải nghiệm phù hợp.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((item) => (
                        <ExpCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
