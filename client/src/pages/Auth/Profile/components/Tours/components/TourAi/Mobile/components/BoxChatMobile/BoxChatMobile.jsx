/** @format */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BoxChatMobile.module.scss";
import ReactMarkdown from "react-markdown";
import { useTour } from "../../../Contexts/useTour";
import clsx from "clsx";
import { toast } from "react-toastify";
import axios from "axios";

export default function BoxChatMobile({ className }) {
    const { chatPresent } = useTour();
    const contentRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);

    /* ===== chỉ lấy assistant messages, sắp xếp mới nhất lên đầu ===== */
    const assistantAi = useMemo(() => {
        const filtered = chatPresent.filter((v) => v.role === "assistant");
        // Sắp xếp theo thời gian: mới nhất lên đầu
        return [...filtered].reverse();
    }, [chatPresent]);

    /* ===== auto scroll lên đầu khi có message mới ===== */
    useEffect(() => {
        if (!contentRef.current || assistantAi.length === 0) return;

        // Cuộn lên đầu khi có tour mới
        contentRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [assistantAi.length]);

    // Handle save tour
    const handleSaveTour = async (tourContent, index) => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            const userId = localStorage.getItem("userid");

            if (!userId) {
                toast.error("Vui lòng đăng nhập để lưu tour");
                return;
            }

            // Call API to save tour
            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/save-tour`,
                {
                    content: tourContent,
                    title: `Tour du lịch ${new Date().toLocaleDateString("vi-VN")}`,
                },
                { headers: { UserId: userId } },
            );

            if (res.data.success) {
                toast.success("Đã lưu tour thành công!");

                // Add visual feedback
                const saveButtons = document.querySelectorAll(
                    `.${styles.SaveTour}`,
                );
                if (saveButtons[index]) {
                    const button = saveButtons[index];
                    const originalHTML = button.innerHTML;
                    button.innerHTML =
                        '<span class="check-icon">✓</span> Đã lưu';
                    button.classList.add(styles.saved);

                    // Reset sau 2 giây
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove(styles.saved);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Save tour error:", error);
            toast.error("Lưu tour thất bại");
        } finally {
            setIsSaving(false);
        }
    };

    // Copy tour content to clipboard
    const handleCopyTour = async (content, index) => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success("Đã sao chép tour vào clipboard");

            // Add visual feedback
            const copyButtons = document.querySelectorAll(
                `.${styles.CopyTour}`,
            );
            if (copyButtons[index]) {
                const button = copyButtons[index];
                const originalHTML = button.innerHTML;
                button.innerHTML =
                    '<span class="check-icon">✓</span> Đã sao chép';
                button.classList.add(styles.copied);

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove(styles.copied);
                }, 2000);
            }
        } catch (err) {
            console.error("Copy failed:", err);
            toast.error("Sao chép thất bại");
        }
    };

    // Share tour
    const handleShareTour = async (content, index) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Tour du lịch của tôi",
                    text: content.substring(0, 100) + "...",
                    url: window.location.href,
                });

                // Add visual feedback
                const shareButtons = document.querySelectorAll(
                    `.${styles.ShareTour}`,
                );
                if (shareButtons[index]) {
                    const button = shareButtons[index];
                    const originalHTML = button.innerHTML;
                    button.innerHTML =
                        '<span class="check-icon">✓</span> Đã chia sẻ';
                    button.classList.add(styles.shared);

                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove(styles.shared);
                    }, 2000);
                }
            } catch (err) {
                console.log("Share cancelled:", err);
            }
        } else {
            toast.info("Trình duyệt không hỗ trợ chia sẻ");
        }
    };

    // Format tour content for better mobile display
    const formatTourContent = (content) => {
        return content
            .replace(/\*\*(.*?)\*\*/g, "**$1**") // Keep bold
            .replace(/### (.*?)(\n|$)/g, "### $1\n") // Headers
            .replace(/- /g, "• "); // Better bullet points
    };

    // Format date for display
    const formatDate = () => {
        const now = new Date();
        return now.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className={`${styles.container} ${className}`}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Lịch sử Tour</h2>
                <p className={styles.subtitle}>Mới nhất sẽ hiển thị ở đầu</p>
            </div>

            {/* Chat container */}
            <div
                ref={contentRef}
                className={styles.ChatAiContainer}
                id="chat-container"
            >
                {assistantAi.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🗺️</div>
                        <h3>Chưa có tour nào</h3>
                        <p>Hãy tạo tour đầu tiên để xem kết quả ở đây</p>
                    </div>
                ) : (
                    <div className={styles.ChatAi}>
                        {assistantAi.map((value, index) => {
                            const isNewest = index === 0; // Mới nhất là index 0
                            const isSecondNew = index === 1; // Tour thứ 2
                            const formattedContent = formatTourContent(
                                value.text,
                            );

                            return (
                                <div
                                    key={value.id ?? `tour-${index}`}
                                    className={clsx(styles.tourCard, {
                                        [styles.newest]: isNewest,
                                        [styles.secondNew]: isSecondNew,
                                        [styles.older]: index > 1,
                                    })}
                                >
                                    {/* Tour header với timestamp */}
                                    <div className={styles.tourHeader}>
                                        <div className={styles.tourMeta}>
                                            <span className={styles.tourNumber}>
                                                {isNewest
                                                    ? "TOUR MỚI NHẤT"
                                                    : `Tour #${assistantAi.length - index}`}
                                            </span>
                                        </div>
                                        {isNewest && (
                                            <span className={styles.newBadge}>
                                                MỚI
                                            </span>
                                        )}
                                    </div>

                                    {/* Tour content với nền đen */}
                                    <div className={styles.tourContent}>
                                        <ReactMarkdown
                                            components={{
                                                h1: ({ node, ...props }) => (
                                                    <h3
                                                        className={
                                                            styles.markdownH3
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h4
                                                        className={
                                                            styles.markdownH4
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                h3: ({ node, ...props }) => (
                                                    <h5
                                                        className={
                                                            styles.markdownH5
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p
                                                        className={
                                                            styles.markdownP
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul
                                                        className={
                                                            styles.markdownUl
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                li: ({ node, ...props }) => (
                                                    <li
                                                        className={
                                                            styles.markdownLi
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                                strong: ({
                                                    node,
                                                    ...props
                                                }) => (
                                                    <strong
                                                        className={
                                                            styles.markdownStrong
                                                        }
                                                        {...props}
                                                    />
                                                ),
                                            }}
                                        >
                                            {formattedContent}
                                        </ReactMarkdown>
                                    </div>

                                    {/* Action buttons */}
                                    <div className={styles.actionButtons}>
                                        <button
                                            type="button"
                                            className={styles.SaveTour}
                                            onClick={() =>
                                                handleSaveTour(
                                                    value.text,
                                                    index,
                                                )
                                            }
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <span
                                                    className={
                                                        styles.buttonSpinner
                                                    }
                                                ></span>
                                            ) : (
                                                <>
                                                    <span
                                                        className={
                                                            styles.buttonIcon
                                                        }
                                                    ></span>
                                                    Lưu
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Scroll indicator chỉ hiển thị khi có nhiều tour */}
                {assistantAi.length > 2 && (
                    <div
                        className={styles.scrollIndicator}
                        onClick={() => {
                            contentRef.current?.scrollTo({
                                top: contentRef.current.scrollHeight,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <span className={styles.scrollIcon}>↓</span>
                        Cuộn xuống xem các tour cũ hơn
                    </div>
                )}
            </div>
        </div>
    );
}
