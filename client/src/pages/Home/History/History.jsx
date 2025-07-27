import React from "react";
import styles from "./History.module.scss";
export default function History() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>
                    Ngày 12/6/2025, Quốc hội thông qua Nghị quyết 202/2025/QH15
                    – sáp nhập tỉnh Kiên Giang vào tỉnh An Giang, từ đó mở ra kỷ
                    nguyên phát triển đồng bộ và nâng tầm vị thế vùng Đồng bằng
                    sông Cửu Long.
                </p>
            </div>
            <div className={styles.merge}>
                {" "}
                <div className={styles.bet}>
                    <h3>Trước sáp nhập</h3>
                </div>
                <div className={styles.content}>
                    <div className={styles.AG}>
                        <h4>An Giang</h4>
                        <div className={styles.content0}>
                            <p>sfsd</p>
                        </div>
                    </div>
                    <div className={styles.KG}>
                        <h4>Kiên Giang</h4>
                        <div className={styles.content1}>
                            <p>sdfs</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*PROCESS */}{" "}
            <div className={styles.process}>
                {" "}
                <div className={styles.bet}>
                    <h3>qua trinh sáp nhập</h3>
                </div>
                <div className={styles.content}>
                    <div className={styles.KG}>
                        <div className={styles.content1}>
                            <p>sdfs</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*AFTER */}{" "}
            <div className={styles.after}>
                {" "}
                <div className={styles.bet}>
                    <h3>sau sáp nhập</h3>
                </div>
                <div className={styles.content}>
                    <div className={styles.KG}>
                        <div className={styles.content1}>
                            <p>sdfs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
