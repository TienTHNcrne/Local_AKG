import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <Link to="/">Quê Hương Việt</Link>
                </div>
                <nav className={styles.nav}>
                    <Link to="/">Trang chủ</Link>
                    <Link to="/explore">Khám phá</Link>
                    <Link to="/events">Sự kiện</Link>
                    <Link to="/about">Giới thiệu</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
