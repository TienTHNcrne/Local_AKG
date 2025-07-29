import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Before_Login.module.scss";
import AI from "../../components/AI/AI";

export default function Before_Login({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />{" "}
            <div className={styles.extra}>
                <AI />
            </div>
            <div className={styles.content}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
}
