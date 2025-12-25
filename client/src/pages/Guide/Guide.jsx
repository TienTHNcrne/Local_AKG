import React, { useState } from "react";
import Genr from "./Genr/Genr";
import Deta from "./Deta/Deta";
import styles from "./Guide.module.scss";

export default function Guide() {
    const [choose, setChoose] = useState(1);

    return (
        <div className={styles.container}>
            <p>
                <strong>
                    Để sử dụng các chức năng của website, vui lòng đăng nhập
                    hoặc đăng ký tài khoản
                </strong>
            </p>
            <div className={styles.bars}>
                <div
                    className={choose === 1 ? styles.active : ""}
                    onClick={() => setChoose(1)}
                >
                    Tổng quan
                </div>
                <div
                    className={choose === 2 ? styles.active : ""}
                    onClick={() => setChoose(2)}
                >
                    Chi tiết
                </div>
            </div>
            <div className={styles.content}>
                {choose === 1 ? <Genr /> : <Deta />}
            </div>{" "}
        </div>
    );
}
