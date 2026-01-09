import React from "react";
import { IoArrowDownOutline } from "react-icons/io5";

import styles from "./Title.module.scss";
export default function Title() {
    const StartImg = new URL("../../../../assets/PQ.jpg", import.meta.url).href;

    return (
        <div className={styles.title}>
            <div className={styles.backImg}>
                {" "}
                <img src={StartImg} alt="" />
            </div>{" "}
            <div className={styles.contentHeader}>
                <div className={styles.titleContent}>
                    <div className={styles.wrapperTitle}>
                        <h1>Bốn vùng khí hậu </h1>
                        <h1>Một bản sắc An Giang</h1>
                    </div>
                    <div className={styles.subtitle}>
                        <p>Khí hậu đa tầng, trải nghiệm đa chiều</p>
                    </div>
                    <div className={styles.des}>
                        <p>
                            {" "}
                            Khám phá sự đa dạng độc đáo của 4 vùng khí hậu riêng
                            biệt cùng hội tụ tạo nên bản sắc đặc trưng của vùng
                            đất An Giang
                        </p>
                    </div>
                </div>
                <span className={styles.ArrowDown}>
                    <h4>khám phá</h4>
                    <IoArrowDownOutline />{" "}
                </span>
                <div className={styles.mouseIndicator}>
                    {" "}
                    <span>CUỘN ĐỂ KHÁM PHÁ</span>
                    <div className={styles.mouse}>
                        <div className={styles.wheel}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
