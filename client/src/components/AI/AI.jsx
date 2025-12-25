/**
 * * global process
 * 	 *
 * 	 * @format
 *
 * @format
 */

import { use, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import styles from "./AI.module.scss";
import { useEffect } from "react";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { notification } from "antd";

export default function Ai() {
    const [hide, setHide] = useState(false);
    const [rep, setRep] = useState("");
    const [content, setContent] = useState("");
    const [save, setSave] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on component mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const submit = () => {
        if (!content.trim()) return;

        const userId = localStorage.getItem("userid");

        setSave((prev) => [...prev, { role: "user", text: content }]);
        axios
            .post(
                `${import.meta.env.VITE_BE_URL}/v1/api/ai`,
                { prompt: content },
                {
                    headers: {
                        ...(userId ? { userId } : {}),
                    },
                }
            )
            .then((res) => {
                const data = res.data.choices[0].message.content;
                setRep(data);
                setSave((prev) => [...prev, { role: "assistant", text: data }]);
                setContent("");
            })
            .catch((err) => {
                console.error(err.message);
                notification.error({
                    message: "Lỗi",
                    description: "Không thể kết nối với trợ lý AI. Vui lòng thử lại.",
                });
            });
        setContent("");
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("userid")) return;

        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/historicAI`, {
                userId: localStorage.getItem("userid"),
            })
            .then((res) => {
                setSave(res.data);
            })
            .catch((err) => console.error("Lỗi API:", err));
    }, []);

    return (
        <div className={styles.container}>
            {hide ? (
                <div className={`${styles.chatbot} ${isMobile ? styles.mobile : ''}`}>
                    <div className={styles.head}>
                        <h3>Trợ lí ảo - AGI</h3>
                        <button
                            onClick={() => {
                                setHide(!hide);
                            }}
                            aria-label="Đóng chat"
                        >
                            ×
                        </button>
                    </div>
                    <div className={styles.content}>
                        {save.length === 0 ? (
                            <div className={styles.welcome}>
                                <p>Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?</p>
                            </div>
                        ) : (
                            save.map((value, id) => (
                                <div key={id} className={styles[value.role]}>
                                    <ReactMarkdown>{value.text}</ReactMarkdown>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={content || ""}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            type="submit" 
                            onClick={submit}
                            disabled={!content.trim()}
                        >
                            <IoSend /> 
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className={`${styles.but} ${isMobile ? styles.mobileBut : ''}`}
                    onClick={() => setHide(!hide)}
                    aria-label="Mở trợ lý AI"
                >
                    <HiChatBubbleBottomCenterText />
                    <span> Chào bạn! Bạn cần giúp gì?</span>
                </button>
            )}
        </div>
    );
}