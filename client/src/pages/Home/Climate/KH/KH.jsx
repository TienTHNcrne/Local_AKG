import React from "react";
import styles from "./KH.module.scss";
import clsx from "clsx";
export default function KH({ climateSeason, setClimateSeason }) {
    return (
        <div className={styles.KH}>
            <div className={styles.buttonSeason}>
                <button
                    className={climateSeason === "dry" ? styles.buttonDry : ""}
                    onClick={() => setClimateSeason("dry")}
                >
                    ☀️ Mùa khô (T12 - T4)
                </button>

                <button
                    className={climateSeason === "wet" ? styles.buttonWet : ""}
                    onClick={() => setClimateSeason("wet")}
                >
                    🌧️ Mùa mưa (T5 - T11)
                </button>
            </div>

            {/* Season details */}
            <div className={styles.seasonDetails}>
                {climateSeason === "dry" && (
                    <div className={clsx(styles.showedSeason, styles.dry)}>
                        <div className={styles.seasonHeader}>
                            <h3>☀️ Mùa khô</h3>
                            <span className={styles.duration}>
                                Tháng 12 - Tháng 4
                            </span>
                        </div>
                    </div>
                )}

                {climateSeason === "wet" && (
                    <div className={clsx(styles.showedSeason, styles.wet)}>
                        <div className={styles.seasonHeader}>
                            <h3>🌧️ Mùa mưa</h3>
                            <span className={styles.duration}>
                                Tháng 5 - Tháng 11
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
