import React from "react";
import styles from "./Header.module.scss";
import { IoMenu } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
export default function Header() {
    return (
        <div className={styles.head}>
            <div className={styles.Left}>
                <IoMenu className={styles.sidebar} />
                <h1>AKG</h1>
            </div>
            <div className={styles.Right}>
                <FaBell className={styles.Bell} />
                <MdAccountCircle className={styles.Acc} />
            </div>
        </div>
    );
}
