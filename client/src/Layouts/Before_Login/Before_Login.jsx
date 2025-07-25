import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Before_Login.module.scss";
import Ai from "../../components/AI/Ai";
import { useLocation } from "react-router-dom";

export default function Before_Login({ children }) {
    const [show, setShow] = useState(false);

    const URL = useLocation();
    useEffect(() => {
        setShow(false);
    }, [URL.pathname]);
    return (
        <div className={styles.wrapper}>
            <Sidebar show={show} />
            {show && (
                <div
                    className={styles.overlay}
                    onClick={() => setShow(false)}
                />
            )}{" "}
            {}
            <Header className={styles.header} show={show} setShow={setShow} />
            <div className={styles.content}>
                {children}
                <div className={styles.extra}>
                    <Ai />
                </div>
            </div>
            <Footer className={styles.footer} />
        </div>
    );
}
