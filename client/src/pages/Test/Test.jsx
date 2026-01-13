import React from "react";
import styles from "./Test.module.scss";
export default function Test() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Cuộc thi .... </h1>
                    <div>
                        <h1>Dề tài</h1>
                        <h2>Tền đề tài</h2>
                    </div>{" "}
                    <h3>tên lĩnh vực</h3>
                </div>
                <div className={styles.demoProduction}></div>
                <div className={styles.kq}> </div>
            </div>
        </div>
    );
}
