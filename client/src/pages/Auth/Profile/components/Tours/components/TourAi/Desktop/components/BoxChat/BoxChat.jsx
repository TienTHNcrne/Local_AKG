/** @format */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./BoxChat.module.scss";
import clsx from "clsx";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { notification } from "antd";

import { useTour } from "../../../Contexts/useTour";
import { useAuth } from "../../../../../../../../../../Contexts/Auth/Auth";

const buildName = (text = "") => {
    const words = text.trim().split(/\s+/).slice(0, 6).join(" ");
    return words || "Hành trình mới";
};

// ── Save Panel (inline name editor) ──────────────────────────────────────────
function SavePanel({ msg, onCancel, onConfirm }) {
    const [name, setName] = useState(buildName(msg.text));
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") onConfirm(name.trim() || buildName(msg.text));
        if (e.key === "Escape") onCancel();
    };

    return (
        <div className={styles.savePanel}>
            <span className={styles.savePanelLabel}>Đặt tên hành trình</span>
            <div className={styles.savePanelRow}>
                <input
                    ref={inputRef}
                    className={styles.savePanelInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={80}
                    placeholder="Nhập tên hành trình..."
                />
                <button
                    type="button"
                    className={styles.savePanelConfirm}
                    onClick={() =>
                        onConfirm(name.trim() || buildName(msg.text))
                    }
                >
                    Lưu
                </button>
                <button
                    type="button"
                    className={styles.savePanelCancel}
                    onClick={onCancel}
                >
                    Huỷ
                </button>
            </div>
        </div>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default React.memo(function BoxChat({ className }) {
    const { chatPresent } = useTour();
    const { user } = useAuth();
    const containerRef = useRef(null);

    // index của card đang mở save panel, null = không có
    const [savingIndex, setSavingIndex] = useState(null);

    const messages = useMemo(
        () => chatPresent.filter((v) => v.role === "assistant"),
        [chatPresent],
    );

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages.length]);

    const [api, contextHolder] = notification.useNotification();

    const handleSave = async (msg, customName) => {
        setSavingIndex(null);
        try {
            await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/plan/Create`,
                {
                    UserId: user.userId,
                    name: customName,
                    details: msg.text,
                },
            );
            api.success({
                message: "Lưu thành công",
                description: `Đã lưu "${customName}" vào hành trình của bạn.`,
                placement: "topRight",
                duration: 3,
            });
        } catch {
            api.error({
                message: "Lưu thất bại",
                description: "Đã có lỗi xảy ra, vui lòng thử lại.",
                placement: "topRight",
                duration: 3,
            });
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div ref={containerRef} className={clsx(styles.container, className)}>
            {contextHolder}
            <div className={styles.list}>
                {messages.map((msg, index) => (
                    <div
                        key={msg.id ?? index}
                        className={clsx(styles.answer, {
                            [styles.answerNew]: index === messages.length - 1,
                        })}
                    >
                        <ReactMarkdown>{msg.text}</ReactMarkdown>

                        {savingIndex === index ? (
                            <SavePanel
                                msg={msg}
                                onCancel={() => setSavingIndex(null)}
                                onConfirm={(name) => handleSave(msg, name)}
                            />
                        ) : (
                            <button
                                type="button"
                                className={styles.saveBtn}
                                onClick={() => setSavingIndex(index)}
                            >
                                Lưu chuyến đi
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});
