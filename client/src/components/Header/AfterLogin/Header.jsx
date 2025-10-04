/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { useAuth } from "../../../Contexts/Auth/Auth";
import { FaStar } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"; // icons for mobile
import TourAi from "../../../pages/Profile/components/Tours/components/TourAi/TourAi";
import { RiGuideFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
export default function Header() {
    const { logout } = useAuth();
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // quản lý dropdown

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };
    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
    };
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            {add && <TourAi setHide={setAdd} />}
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
                <button className={styles.icon1} onClick={() => setAdd(true)}>
                    <FaStar />
                </button>
                <button
                    className={styles.icon1}
                    onClick={() => navigate("/guide")}
                >
                    <RiGuideFill />
                </button>
                <div className={styles.account}>
                    <MdAccountCircle
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={styles.icon}
                    />
                    {show && (
                        <div className={styles.infor}>
                            <Link to="/profile">
                                <div className={styles.item}>
                                    <AiFillProfile />
                                    <p>Profile</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <div className={styles.item}>
                                    <IoLogInOutline /> <p>Logout</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
