import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoMenu } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
export default function Header() {
    return (
        <div className={styles.head}>
            <div className={styles.Left}>
                <IoMenu className={styles.sidebar} />
                <Link to="/">
                    {" "}
                    <h1>AKG</h1>
                </Link>
            </div>
            <div className={styles.Right}>
                <FaBell className={styles.Bell} />
                <MdAccountCircle className={styles.Acc} />
                <Link to="/edit">
                    <FaEdit className={styles.Edit} />
                </Link>
            </div>
        </div>
    );
}
