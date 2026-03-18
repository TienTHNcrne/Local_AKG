/** @format */
import React, { useEffect } from "react";
import TourAiDesktop from "./Desktop/TourAiDesktop.jsx";
import TourAiMobile from "./Mobile/TourAiMobile.jsx";
import styles from "./TourAi.module.scss";
import { useMediaQuery } from "react-responsive";
import TourProvide from "./Contexts/useTour.jsx";
import { useAuth } from "../../../../../../../Contexts/Auth/Auth.jsx";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

/* ── SVG Icons (inline, no extra deps) ─────────────────── */
const CompassIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const LockIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const MapPinIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

/* ── Unauthenticated State ──────────────────────────────── */
function UnauthenticatedView() {
    const navigate = useNavigate();

    return (
        <div className={styles.unauthContainer}>
            {/* Ambient orbs */}
            <div className={styles.unauthOrb} />
            <div className={styles.unauthOrb} />

            <div className={styles.unauthCard}>
                <div className={styles.unauthIcon}>
                    <LockIcon />
                </div>

                <h1 className={styles.unauthTitle}>
                    Chào mừng đến
                    <br />
                    <em>Tour AI</em>
                </h1>

                <p className={styles.unauthSubtitle}>
                    Vui lòng đăng nhập để khám phá hành trình cùng trí tuệ nhân
                    tạo — thiết kế riêng cho bạn.
                </p>

                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon />
                    Quay lại
                </button>
            </div>
        </div>
    );
}

/* ── Main App Shell ─────────────────────────────────────── */
function AppShell({ isMobile, user }) {
    return (
        <div className={styles.appShell}>
            {/* Top accent gradient line */}
            <div className={styles.accentBar} />

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logoMark}>
                    <div className={styles.logoIcon}>
                        <CompassIcon />
                    </div>
                    <span className={styles.logoText}>
                        Tour<span>AI</span>
                    </span>
                </div>

                <div className={styles.headerRight}>
                    <div className={styles.userBadge}>
                        <div className={styles.userDot} />
                        {user?.name || user?.email || "Khách"}
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className={styles.mainContent}>
                {isMobile ? <TourAiMobile /> : <TourAiDesktop />}
            </main>
        </div>
    );
}

export function Action() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.userId) {
            notification.warning({
                message: "Chưa đăng nhập",
                description: "Vui lòng đăng nhập để sử dụng tính năng này",
                placement: "topRight",
                style: {
                    borderRadius: 12,
                    fontFamily: "'DM Sans', sans-serif",
                },
            });
        }
    }, [user]);

    if (!user?.userId) {
        return (
            <div className={styles.container}>
                <UnauthenticatedView />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <AppShell isMobile={isMobile} user={user} />
        </div>
    );
}

export default function TourAi() {
    return (
        <TourProvide>
            <Action />
        </TourProvide>
    );
}
