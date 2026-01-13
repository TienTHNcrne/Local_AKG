/** @format */
import React, { useEffect, useMemo, useRef } from "react";
import styles from "./BoxChat.module.scss";
import ReactMarkdown from "react-markdown";
import { useTour } from "../../Contexts/useTour";
import clsx from "clsx";

export default function BoxChat({ className }) {
    const { chatPresent } = useTour();
    const contentRef = useRef(null);

    /* ===== chỉ lấy assistant messages, có memo ===== */
    const assistantAi = useMemo(
        () => chatPresent.filter((v) => v.role === "assistant"),
        [chatPresent],
    );

    /* ===== auto scroll khi có message mới ===== */
    useEffect(() => {
        if (!contentRef.current) return;
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, [assistantAi.length]);

    return (
        <div className={className}>
            <div ref={contentRef} className={styles.ChatAiContainer}>
                <div className={styles.ChatAi}>
                    {assistantAi.map((value, index) => {
                        const isLast = index === assistantAi.length - 1;

                        return (
                            <div
                                key={value.id ?? index}
                                className={clsx(styles.answer, {
                                    [styles.new]: isLast,
                                })}
                            >
                                <ReactMarkdown>{value.text}</ReactMarkdown>

                                <button
                                    type="button"
                                    className={styles.SaveTour}
                                >
                                    Lưu chuyến đi
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
