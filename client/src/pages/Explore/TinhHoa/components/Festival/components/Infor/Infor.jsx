/** @format */
import React from "react";
import styles from "./Infor.module.scss";

export default function Infor({
    name,
    time = [],
    description,
    place = [],
    images = [],
    setPopup,
}) {
    console.log(time);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <button onClick={() => setPopup(false)}>&times;</button>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {/* Ảnh đại diện random */}
                    {images.length > 0 && (
                        <img
                            src={
                                images[
                                    Math.floor(Math.random() * images.length)
                                ]
                            }
                            alt={name}
                        />
                    )}

                    {/* Nội dung chính */}
                    <div className={styles.main}>
                        {/* Tên lễ hội */}
                        <div className={styles.mainContent}>
                            <h2>{name}</h2>
                        </div>

                        {/* Thời gian */}
                        <div className={styles.mainContent}>
                            <h4>Thời gian</h4>
                            {time.length > 0 ? (
                                time.map((t, idx) => <p key={idx}>{t}</p>)
                            ) : (
                                <p>Chưa có thông tin</p>
                            )}
                        </div>

                        {/* Địa điểm */}
                        <div className={styles.mainContent}>
                            <h4>Địa điểm</h4>
                            {place.length > 0 ? (
                                place.map((p, idx) => <p key={idx}>{p}</p>)
                            ) : (
                                <p>Chưa có thông tin</p>
                            )}
                        </div>

                        {/* Mô tả */}
                        <div className={styles.mainContent}>
                            <h4>Ý nghĩa – nguồn gốc – vai trò</h4>
                            <p>{description || "Chưa có mô tả"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
