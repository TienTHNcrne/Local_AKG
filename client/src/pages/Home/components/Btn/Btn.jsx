// Btn.js
import React from "react";
import styles from "./Btn.module.scss";

export default function Btn({ className }) {
    const surveyUrl =
        "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__X2_NIxUNVNNTVkwU0RTS1hIT1dKVFlNNUpVOFEwRC4u&route=shorturl";

    const handleClick = () => {
        window.open(surveyUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className={`${styles.btnContainer} ${className}`}>
            <button
                className={styles.surveyButton}
                onClick={handleClick}
                aria-label="Tham gia khảo sát đánh giá website"
                title="Đánh giá website AGiLand"
            >
                <span>✏️</span>
                <div className={styles.buttonText}>
                    Cho team mình xin feedback để cải thiện thêm nhé
                </div>
            </button>
        </div>
    );
}
