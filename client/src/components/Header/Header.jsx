import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoMenu, IoHome, IoShareSocial } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export default function Header() {
    return (
        <div className={styles.header}>
            <Link to="/" className={styles.logo}>
                <h2>AKG</h2>
            </Link>

            <nav className={styles.nav}>
                <div className={styles.dropdown}>
                    <Link to="/">
                        <IoHome />
                        <span>Trang chủ</span>
                    </Link>
                    <ul className={styles.dropdownMenu}>
                        <li>
                            <Link to="/Location">Location</Link>
                        </li>
                        <li>
                            <Link to="/Climate">Climate</Link>
                        </li>
                        <li>
                            <Link to="/History">History</Link>
                        </li>
                        <li>
                            <Link to="/CulSoc">Culture-Society</Link>
                        </li>
                        <li>
                            <Link to="/">Note</Link>
                        </li>
                        <li>
                            <Link to="/">Food</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.dropdown}>
                    <Link to="/Explore">
                        <IoShareSocial />
                        <span>Khám phá</span>
                    </Link>
                    <ul className={styles.dropdownMenu}>
                        <li>
                            <Link to="/Explore/map">Map</Link>
                        </li>
                        <li>
                            <Link to="/Explore/event">Event</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <Link to="/About">Về chúng tôi</Link>
                </div>
            </nav>

            <div className={styles.right}>
                <Link to="/edit" className={styles.icon}>
                    <IoShareSocial />
                </Link>
                <FaBell className={styles.icon} />
                <MdAccountCircle className={styles.icon} />
            </div>
        </div>
    );
}
