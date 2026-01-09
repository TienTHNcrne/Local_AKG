import React from "react";
import styles from "./TQ.module.scss";
export default function TQ({ selectedArea }) {
    return (
        <div className={styles.TQ}>
            <div className={styles.highlights}>
                <h3>Điểm nổi bật</h3>
                <div className={styles.highlightList}>
                    {selectedArea &&
                        selectedArea.highlights.map((highlight, index) => (
                            <div key={index} className={styles.highlight}>
                                <span className={styles.checkmark}>✓</span>
                                <span>{highlight}</span>{" "}
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.QuickClimateSummary}>
                <h3>Thông tin du lịch</h3>
                <div className={styles.QuickFacts}>
                    <div className={styles.QuickFact}>
                        <span>📅</span>
                        <h4> Thời gian lí tưởng </h4>
                        <p>{selectedArea && selectedArea.travel.bestTime}</p>
                    </div>
                    <div className={styles.QuickFact}>
                        <span>🎯</span>
                        <h4>Hoạt động chính</h4>
                        <p>
                            {selectedArea && selectedArea.travel.activities[0]}
                        </p>
                    </div>
                    <div className={styles.QuickFact}>
                        <span>💡</span>
                        <h4>Điểm nhấn</h4>
                        <p>
                            {selectedArea && selectedArea.travel.activities[0]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
