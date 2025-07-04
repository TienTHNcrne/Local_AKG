import React, { useState } from "react";
import Header from "../components/Layout/Header/Header";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.contain}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
