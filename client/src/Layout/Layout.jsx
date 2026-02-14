/** @format */

import React from "react";
import TravelerHeader from "../components/Header/TravelerHeader/TravelerHeader";
import BusinessHeader from "../components/Header/BusinessHeader/BusinessHeader";
import Footer from "../components/Footer/Footer";
import styles from "./Layout.module.scss";
import AI from "../components/AI/AI";
export default function Before_Login({ children }) {
    console.log("Current role in Layout:", localStorage.getItem("role"));
    return (
        <div className={styles.wrapper}>
            {localStorage.getItem("role") === "business" ? (
                <BusinessHeader />
            ) : (
                <TravelerHeader />
            )}
            <div className={styles.extra}>
                <AI />
            </div>
            <div className={styles.content}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
}
