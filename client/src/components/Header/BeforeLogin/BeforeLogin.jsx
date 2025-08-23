/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./BeforeLogin.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";

export default function BeforeLogin() {
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
                            <Link to="/Location">Tổng quan</Link>
                        </li>
                        <li>
                            <Link to="/Climate">Khí hậu</Link>
                        </li>
                        <li>
                            <Link to="/History">Lịch sử</Link>
                        </li>
                        <li>
                            <Link to="/CulSoc">Dân tộc - Lễ hội</Link>
                        </li>

                        <li>
                            <Link to="/Religion">Tôn giáo - Tín ngưỡng</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.dropdown}>
                    <div>
                        <IoShareSocial />
                        <span>Khám phá</span>
                    </div>
                    <ul className={styles.dropdownMenu}>
                        <li>
                            <Link to="/Explore/map">Bản đồ</Link>
                        </li>
                        <li>
                            <Link to="/Explore/TinhHoa">Tinh hoa An Giang</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <Link to="/About">Về chúng tôi</Link>
                </div>
            </nav>

            <div className={styles.right}>
                <Link to="/register">
                    <button>Sign Up</button>
                </Link>{" "}
                <Link to="/Login">
                    <button>Sign In</button>
                </Link>{" "}
            </div>
        </div>
    );
}
