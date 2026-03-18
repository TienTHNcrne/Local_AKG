/** @format */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TourHistory.module.scss";
import axios from "axios";
import { useAuth } from "../../../../../../../../../../Contexts/Auth/Auth";

// ── Constants ─────────────────────────────────────────────────────────────────

const FILTERS = [
    { key: "All", label: "Tất cả" },
    { key: "Saved", label: " Đã lưu" },
    { key: "NSave", label: " Chưa lưu" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatText = (text = "") =>
    text
        .split("\n")
        .map((line) => {
            const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            if (line.startsWith("* ") || line.startsWith("+ "))
                return `<li>${bold.replace(/^\*\s|^\+\s/, "")}</li>`;
            if (bold.startsWith("<strong>") && bold.endsWith("</strong>"))
                return `<h4>${bold}</h4>`;
            return bold ? `<p>${bold}</p>` : "";
        })
        .join("");

const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });

// ── Modal ─────────────────────────────────────────────────────────────────────
function TourModal({ item, onClose }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return createPortal(
        <div
            className={styles.backdrop}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={styles.modal} role="dialog" aria-modal="true">
                {/* Header */}
                <div
                    className={`${styles.modalHeader} ${item.isSaved ? styles.modalHeaderSaved : styles.modalHeaderAi}`}
                >
                    <div className={styles.modalMeta}>
                        <span className={styles.modalTitle}>
                            {item.isSaved
                                ? item.name
                                : formatDate(item.timestamp)}
                        </span>
                        {!item.isSaved && (
                            <span className={styles.modalTime}>
                                {formatTime(item.timestamp)}
                            </span>
                        )}
                    </div>

                    <span
                        className={`${styles.badge} ${item.isSaved ? styles.badgeSaved : styles.badgeAi}`}
                    >
                        {item.isSaved ? "Đã lưu" : "Gợi ý AI"}
                    </span>

                    <button
                        className={styles.modalCloseIcon}
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className={styles.modalBody}>
                    <div
                        className={styles.modalContent}
                        dangerouslySetInnerHTML={{
                            __html: formatText(item.text ?? item.details ?? ""),
                        }}
                    />
                </div>

                {/* Footer */}
                <div className={styles.modalFooter}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        Đóng hành trình
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}

// ── TourCard ──────────────────────────────────────────────────────────────────
function TourCard({ item, index }) {
    const [showModal, setShowModal] = useState(false);
    const rawText = item.text ?? item.details ?? "";
    const preview = rawText.slice(0, 160) + (rawText.length > 160 ? "..." : "");

    return (
        <>
            <div
                className={`${styles.card} ${item.isSaved ? styles.cardSaved : styles.cardAi}`}
                style={{ animationDelay: `${index * 0.07}s` }}
            >
                {/* Accent strip */}
                <div className={styles.cardAccent}>
                    <div className={styles.cardMeta}>
                        <span className={styles.cardTitle}>
                            {item.isSaved
                                ? item.name
                                : formatDate(item.timestamp)}
                        </span>
                        {!item.isSaved && (
                            <span className={styles.cardTime}>
                                {formatTime(item.timestamp)}
                            </span>
                        )}
                    </div>

                    <span
                        className={`${styles.badge} ${item.isSaved ? styles.badgeSaved : styles.badgeAi}`}
                    >
                        {item.isSaved ? "Đã lưu" : "AI"}
                    </span>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                    <p className={styles.cardPreview}>{preview}</p>
                    <button
                        className={styles.viewBtn}
                        onClick={() => setShowModal(true)}
                    >
                        Xem đầy đủ <span>↗</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <TourModal
                    item={item}
                    index={index}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

// ── TourHistory ───────────────────────────────────────────────────────────────
export default function TourHistory() {
    const { user } = useAuth();

    const [filter, setFilter] = useState("All");
    const [res, setRes] = useState([]);
    const [resS, setResS] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.userId) {
            window.alert("Bạn chưa đăng nhập");
            return;
        }

        setLoading(true);
        Promise.all([
            axios.post(`${import.meta.env.VITE_BE_URL}/v1/api/historicTour`, {
                userId: user.userId,
            }),
            axios.post(`${import.meta.env.VITE_BE_URL}/v1/api/plan/GetAll`, {
                UserId: user.userId,
            }),
        ])
            .then(([tourRes, planRes]) => {
                setRes(
                    tourRes.data
                        .filter((e) => e.role === "assistant")
                        .map((e) => ({ ...e, isSaved: false })),
                );
                setResS(planRes.data.map((e) => ({ ...e, isSaved: true })));
            })
            .finally(() => setLoading(false));
    }, []);

    const displayData =
        filter === "All" ? [...res, ...resS] : filter === "Saved" ? resS : res;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={styles.container}>
            {/* Filter bar */}
            <div className={styles.filterBar}>
                <div className={styles.filterTabs}>
                    {FILTERS.map((tab) => (
                        <button
                            key={tab.key}
                            className={`${styles.filterTab} ${filter === tab.key ? styles.filterTabActive : ""}`}
                            onClick={() => setFilter(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <span className={styles.countBadge}>
                    {displayData.length} hành trình
                </span>
            </div>

            {/* Content */}
            <main className={styles.main}>
                {loading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner} />
                        <p>Đang tải hành trình...</p>
                    </div>
                ) : displayData.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span>🗺️</span>
                        <p>Chưa có hành trình nào</p>
                        <span>Bắt đầu khám phá An Giang ngay hôm nay!</span>
                    </div>
                ) : (
                    <div className={styles.cardGrid}>
                        {displayData.map((item, idx) => (
                            <TourCard
                                key={item._id ?? idx}
                                item={item}
                                index={idx}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
