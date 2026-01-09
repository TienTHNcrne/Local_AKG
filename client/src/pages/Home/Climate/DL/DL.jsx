import React, { useState } from "react";
import styles from "./DL.module.scss";
import clsx from "clsx";

export default function DL({ selectedArea }) {
    const imgs = new URL("../../../../assets/test/0.jpg", import.meta.url).href;
    const [selectId, setSelectId] = useState(null);

    return (
        <div className={styles.container}>
            {/* BEST TIME */}
            <div className={styles.BestTime}>
                <h3>Thời điểm lí tưởng</h3>
                <div>
                    <span>{selectedArea?.travel.bestTime}</span>
                    <p>
                        Đây là khoảng thời gian tốt nhất để tham quan với thời
                        tiết thuận lợi và nhiều hoạt động đặc sắc.
                    </p>
                </div>
            </div>

            {/* ACTIVITIES */}
            <div className={styles.activities}>
                <h3>Hoạt động có thể thử</h3>
                <div className={styles.cards}>
                    {selectedArea?.travel.activities.map((activity) => (
                        <span key={activity}>{activity}</span>
                    ))}
                </div>
            </div>

            {/* TIPS */}
            <div className={styles.Tips}>
                <h3>Các lưu ý quan trọng</h3>
                <div className={styles.cards}>
                    {selectedArea?.travel.tips.map((tip, id) => (
                        <div className={styles.cardTips} key={tip}>
                            <span>{id + 1}</span>
                            <p>{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SUGGESTED PLACES */}
            <div className={styles.suggestedPlaces}>
                <h3>Địa điểm gợi ý</h3>
                <div className={styles.SuggGrid}>
                    {selectedArea?.suggestedPlaces.map((place, id) => (
                        <div
                            key={place.name}
                            className={clsx(
                                styles.SuggCard,
                                selectId === id && styles.active,
                            )}
                            onClick={() =>
                                setSelectId(selectId === id ? null : id)
                            }
                        >
                            <div className={styles.InnerCard}>
                                {/* FRONT */}
                                <div className={styles.front}>
                                    <img src={imgs} alt={place.name} />
                                    <div className={styles.contentFront}>
                                        <h3>{place.name}</h3>
                                        <button className={styles.btn}>
                                            <span>Khám phá</span>
                                            <div className={styles.icon}>→</div>
                                        </button>
                                    </div>
                                </div>

                                {/* BACK */}
                                <div className={styles.back}>
                                    <div className={styles.contentBack}>
                                        <div className={styles.TitleBack}>
                                            <h3>{place.name}</h3>
                                            <div className={styles.rate}>
                                                4.5/5.0
                                            </div>
                                        </div>

                                        <div className={styles.MainContent}>
                                            <p>
                                                Một điểm đến tuyệt vời với cảnh
                                                quan thiên nhiên hùng vĩ và
                                                nhiều trải nghiệm độc đáo.
                                            </p>
                                        </div>

                                        <div className={styles.FootBack}>
                                            <button className={styles.moreInfo}>
                                                Xem thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
