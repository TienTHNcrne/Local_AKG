import React from "react";
import styles from "./Climate.module.scss";

export default function Climate() {
    return (
        <div className={styles.container}>
            <div className={styles.climate}>
                <div className={styles.title}>
                    <h3>Khí hậu</h3>
                </div>
                <div className={styles.con}>
                    <p>
                        An Giang có khí hậu nhiệt đới gió mùa, chia thành hai
                        mùa rõ rệt: mùa mưa và mùa khô.
                    </p>
                    <h4>Đặc điểm khí hậu theo mùa</h4>
                    <div className={styles.grid}>
                        <div className={styles.con1}>
                            <div className={styles.mua}>
                                <h5>Mùa mưa</h5>
                                <p>
                                    Kéo dài từ tháng 5 đến tháng 11, lượng mưa
                                    lớn và tập trung, đặc biệt vào các tháng 7,
                                    8, 9, làm dâng cao mực nước các sông, kênh,
                                    rạch.
                                </p>
                            </div>
                            <div className={styles.kho}>
                                <h5>Mùa khô</h5>
                                <p>
                                    Bắt đầu từ tháng 12 đến tháng 4 năm sau, khí
                                    hậu mát mẻ hơn, biên độ nhiệt giảm, trời
                                    quang đãng, nắng nhiều, nhưng ban ngày có
                                    thể oi bức. Lượng mưa giảm đáng kể.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.temperature}>
                <div className={styles.title}>
                    <h3>Nhiệt độ</h3>
                </div>{" "}
                <div className={styles.bor}>
                    <div className={styles.content}>
                        <p>
                            Nhiệt độ trung bình hằng năm dao động từ 26,4°C đến
                            28°C, và nhiệt độ trung bình hằng tháng từ 27°C đến
                            27,5°C.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
