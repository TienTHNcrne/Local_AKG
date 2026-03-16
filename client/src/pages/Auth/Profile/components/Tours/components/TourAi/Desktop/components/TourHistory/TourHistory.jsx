/** @format */
import React, { useState, useEffect } from "react";
import styles from "./TourHistory.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

export default function TourHistory() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTourHistory();
    }, []);

    const fetchTourHistory = async () => {
        try {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                toast.error("Bạn chưa đăng nhập");
                return;
            }

            const res = await axios.get(
                `${import.meta.env.VITE_BE_URL}/v1/api/tour/history`,
                { headers: { UserId: userId } },
            );

            setTours(res.data || []);
        } catch (err) {
            console.error("Lỗi tải lịch sử:", err);
            toast.error("Không thể tải lịch sử hành trình");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Đang tải lịch sử...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Lịch sử hành trình</h2>
                <p>{tours.length} hành trình đã tạo</p>
            </div>

            {tours.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>📅</div>
                    <h3>Chưa có hành trình nào</h3>
                    <p>Bắt đầu tạo hành trình đầu tiên của bạn!</p>
                </div>
            ) : (
                <div className={styles.tourList}>
                    {tours.map((tour, index) => (
                        <div
                            key={tour._id || index}
                            className={styles.tourCard}
                        >
                            <div className={styles.tourHeader}>
                                <div className={styles.tourMeta}>
                                    <span className={styles.date}>
                                        {formatDate(tour.createdAt)}
                                    </span>
                                    <span className={styles.status}>
                                        {tour.status || "Hoàn thành"}
                                    </span>
                                </div>
                                <div className={styles.tourActions}>
                                    <button className={styles.viewBtn}>
                                        Xem chi tiết
                                    </button>
                                    <button className={styles.saveBtn}>
                                        Lưu lại
                                    </button>
                                </div>
                            </div>

                            <div className={styles.tourContent}>
                                <div className={styles.tourInfo}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>
                                            Số ngày:
                                        </span>
                                        <span className={styles.value}>
                                            {tour.days || "N/A"} ngày
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>
                                            Ngân sách:
                                        </span>
                                        <span className={styles.value}>
                                            {tour.budget || "N/A"} triệu
                                        </span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>
                                            Điểm khởi hành:
                                        </span>
                                        <span className={styles.value}>
                                            {tour.startPlace || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.tourPreview}>
                                    <h4>Nội dung hành trình:</h4>
                                    <div className={styles.previewText}>
                                        {tour.response ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        tour.response.substring(
                                                            0,
                                                            300,
                                                        ) +
                                                        (tour.response.length >
                                                        300
                                                            ? "..."
                                                            : ""),
                                                }}
                                            />
                                        ) : (
                                            <p>Nội dung không khả dụng</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
