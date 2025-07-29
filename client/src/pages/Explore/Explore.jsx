import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Explore.module.scss";
export default function Explore() {
    return (
        <div className={styles.container}>
            <Outlet />
        </div>
    );
}
