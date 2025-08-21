import React from "react";
import styles from "./Religion.module.scss";
import SlideImg from "./components/SlideImg/SlideImg";
import Belief from "./components/Belief/Belief";
export default function Religion() {
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <img src={"/imgs/panner2.jpg"} alt="" />
                <h1>Tôn giáo - Tính ngưỡng</h1>
            </div>
            <div className={styles.content}>
                <SlideImg />
                <Belief />
            </div>
        </div>
    );
}
