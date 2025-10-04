/** @format */

import React, { useState } from "react";
import styles from "./History.module.scss";
import Before from "./Components/Before/Before";
import After from "./Components/After/After";
export default function History() {
    const [choose, setChoose] = useState("before");
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.before}>
                    <h2
                        onClick={() => {
                            setChoose("before");
                        }}
                        className={choose === "before" ? styles.processing : ""}
                    >
                        Trước sáp nhập
                    </h2>
                </div>
                <div className={styles.after}>
                    <h2
                        onClick={() => {
                            setChoose("after");
                        }}
                        className={choose === "after" ? styles.processing : ""}
                    >
                        Sau sáp nhập
                    </h2>
                </div>
            </div>
            {choose === "before" ? <Before /> : <After />}
        </div>
    );
}
