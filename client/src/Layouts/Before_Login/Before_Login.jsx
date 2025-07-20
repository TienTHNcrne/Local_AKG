import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Before_Login.module.scss";

export default function Before_Login({ children }) {
    const [show, setShow] = useState(false);

    return (
        <div className={styles.wrapper}>
            {" "}
            <Sidebar show={show} />
            {show && (
                <div
                    className={styles.overlay}
                    onClick={() => setShow(false)}
                />
            )}{" "}
            <Header className={styles.header} show={show} setShow={setShow} />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
        </div>
    );
}
