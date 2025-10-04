import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BeforeLogin.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";

export default function BeforeLogin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // quản lý dropdown

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };
    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
    };
    return (
        <div className={styles.header}>
            {/* Mobile Menu Icon */}
            <div
                className={styles.menuIcon}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </div>

            <Link to="/" className={styles.logo}>
                <h2>AGiLand</h2>
            </Link>

            <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
                {/* Trang chủ */}
                <div
                    className={styles.dropdown}
                    onClick={() => {
                        if (openDropdown === "home") setOpenDropdown(null);
                        toggleDropdown("home");
                    }}
                >
                    <div>
                        <IoHome />
                        <span>Trang chủ</span>
                        <FaAngleDown />
                    </div>
                    <ul
                        className={`${styles.dropdownMenu} ${
                            openDropdown === "home" ? styles.show : ""
                        }`}
                    >
                        <li>
                            <Link to="/Location" onClick={handleLinkClick}>
                                Tổng quan
                            </Link>
                        </li>
                        <li>
                            <Link to="/Climate" onClick={handleLinkClick}>
                                Khí hậu
                            </Link>
                        </li>
                        <li>
                            <Link to="/History" onClick={handleLinkClick}>
                                Lịch sử
                            </Link>
                        </li>
                        <li>
                            <Link to="/CulSoc" onClick={handleLinkClick}>
                                Dân tộc - Lễ hội
                            </Link>
                        </li>
                        <li>
                            <Link to="/Religion" onClick={handleLinkClick}>
                                Tôn giáo - Tín ngưỡng
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Khám phá */}
                <div
                    className={styles.dropdown}
                    onClick={() => {
                        if (openDropdown === "explore") setOpenDropdown(null);
                        toggleDropdown("explore");
                    }}
                >
                    <div>
                        <IoShareSocial />
                        <span>Khám phá</span>
                        <FaAngleDown />
                    </div>
                    <ul
                        className={`${styles.dropdownMenu} ${
                            openDropdown === "explore" ? styles.show : ""
                        }`}
                    >
                        <li>
                            <Link to="/Explore/map" onClick={handleLinkClick}>
                                Bản đồ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Explore/TinhHoa"
                                onClick={handleLinkClick}
                            >
                                Tinh hoa An Giang
                            </Link>
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
                </Link>
                <Link to="/Login">
                    <button>Sign In</button>
                </Link>
            </div>
        </div>
    );
}
