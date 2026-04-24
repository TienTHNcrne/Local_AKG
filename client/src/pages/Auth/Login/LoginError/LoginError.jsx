/** @format */

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./LoginError.module.scss";

const LoginError = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const raw = searchParams.get("msg") || "Đã xảy ra lỗi không xác định.";
        setMsg(decodeURIComponent(raw));
        // Trigger animation after mount
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, [searchParams]);

    const handleRetry = () => navigate("/login");

    return (
        <div className={`${styles.wrapper} ${visible ? styles.visible : ""}`}>
            {/* Ambient blobs */}
            <span className={`${styles.blob} ${styles.blob1}`} />
            <span className={`${styles.blob} ${styles.blob2}`} />

            <div className={styles.card}>
                {/* Glitch icon */}
                <div className={styles.iconWrap} aria-hidden="true">
                    <svg viewBox="0 0 64 64" fill="none" className={styles.icon}>
                        <circle cx="32" cy="32" r="30" strokeWidth="2.5" className={styles.ring} />
                        <line x1="21" y1="21" x2="43" y2="43" strokeWidth="3" strokeLinecap="round" className={styles.cross1} />
                        <line x1="43" y1="21" x2="21" y2="43" strokeWidth="3" strokeLinecap="round" className={styles.cross2} />
                    </svg>
                    <div className={styles.glitch} aria-hidden="true" />
                </div>

                <h1 className={styles.title}>
                    <span className={styles.titleMain}>Đăng nhập</span>
                    <span className={styles.titleSub}>thất bại</span>
                </h1>

                <p className={styles.message}>{msg}</p>

                <div className={styles.actions}>
                    <button className={styles.retryBtn} onClick={handleRetry}>
                        <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                            <path d="M4 10a6 6 0 1 1 1.6 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            <polyline points="4,7 4,11 8,11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Thử lại
                    </button>
                    <button className={styles.homeBtn} onClick={() => navigate("/")}>
                        Về trang chủ
                    </button>
                </div>

                <p className={styles.hint}>
                    Gặp sự cố liên tục?&nbsp;
                    <a href="mailto:support@agiland.vn.info.vn" className={styles.link}>
                        Liên hệ hỗ trợ
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginError;
