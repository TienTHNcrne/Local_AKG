/** @format */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IoHome, IoShareSocial, IoLogInOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { FaStar, FaAngleDown } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine, RiGuideFill } from "react-icons/ri";

import styles from "./TravelerHeader.module.scss";
import { useAuth } from "../../../Contexts/Auth/Auth";
import TourAi from "../../../pages/Auth/Profile/components/Tours/components/TourAi/TourAi";

export default function TravelerHeader() {
    const Logo = new URL("../../../assets/Logo.png", import.meta.url).href;
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const accountRef = useRef(null);

    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setShow(false);
    };

    const SetNameMenu = (name) =>
        setOpenDropdown(openDropdown === name ? null : name);

    const handleLogout = () => {
        localStorage.clear();
        logout();
        handleLinkClick();
        window.location.href = "/";
    };

    return (
        <div className={styles.header}>
            {add && <TourAi setHide={setAdd} />}

            {/* Mobile */}
            <div
                className={isMobile ? styles.menuIcon : styles.menuIconHidden}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </div>

            {/* Logo */}
            <div className={styles.logoContainer} onClick={() => navigate("/")}>
                <img src={Logo} className={styles.logoIcon} alt="" />
                <div className={styles.logoText}>
                    <h1 className={styles.logoMain}>AGiLand</h1>
                    <span className={styles.logoSub}>Traveler Portal</span>
                </div>
            </div>

            {/* NAV */}
            <nav
                className={clsx(
                    styles.navMenu,
                    menuOpen && isMobile && styles.active,
                )}
            >
                {/* Hồ sơ tỉnh */}
                <div
                    className={clsx(
                        styles.navItem,
                        openDropdown === "province" && styles.activeNav,
                    )}
                    onClick={() => SetNameMenu("province")}
                >
                    <div className={styles.dropdownToggle}>
                        <IoHome />
                        <span>Hồ sơ tỉnh</span>
                        <FaAngleDown />
                    </div>
                    <ul
                        className={styles.dropdownMenu}
                        style={
                            openDropdown === "province"
                                ? { opacity: 1, visibility: "visible" }
                                : { opacity: 0, visibility: "hidden" }
                        }
                    >
                        <li>
                            <Link
                                to="/province/overview"
                                onClick={handleLinkClick}
                            >
                                Tổng quan
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/province/climate"
                                onClick={handleLinkClick}
                            >
                                Khí hậu
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/province/history"
                                onClick={handleLinkClick}
                            >
                                Lịch sử
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/province/culture"
                                onClick={handleLinkClick}
                            >
                                Văn hóa
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/province/religion"
                                onClick={handleLinkClick}
                            >
                                Tín ngưỡng
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Khám phá */}
                <div
                    className={clsx(
                        styles.navItem,
                        openDropdown === "explore" && styles.activeNav,
                    )}
                    onClick={() => SetNameMenu("explore")}
                >
                    <div className={styles.dropdownToggle}>
                        <IoShareSocial />
                        <span>Khám phá</span>
                        <FaAngleDown />
                    </div>
                    <ul
                        className={styles.dropdownMenu}
                        style={
                            openDropdown === "explore"
                                ? { opacity: 1, visibility: "visible" }
                                : { opacity: 0, visibility: "hidden" }
                        }
                    >
                        <li>
                            <Link to="/explore/map" onClick={handleLinkClick}>
                                Bản đồ số
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Explore/TinhHoa/place"
                                onClick={handleLinkClick}
                            >
                                Điểm đến
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Explore/TinhHoa/food"
                                onClick={handleLinkClick}
                            >
                                Ẩm thực
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Explore/TinhHoa/event"
                                onClick={handleLinkClick}
                            >
                                Lễ hội{" "}
                            </Link>
                        </li>
                        <li>
                            <Link to="/explore/stay" onClick={handleLinkClick}>
                                Lưu trú
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* AI */}
                <div
                    className={clsx(
                        styles.navItem,
                        openDropdown === "ai" && styles.activeNav,
                    )}
                    onClick={() => SetNameMenu("ai")}
                >
                    <div className={styles.dropdownToggle}>
                        <RiGuideFill />
                        <span>Lịch trình AI</span>
                        <FaAngleDown />
                    </div>
                    <ul
                        className={styles.dropdownMenu}
                        style={
                            openDropdown === "ai"
                                ? { opacity: 1, visibility: "visible" }
                                : { opacity: 0, visibility: "hidden" }
                        }
                    >
                        <li>
                            <Link to="/ai/suggest" onClick={handleLinkClick}>
                                Gợi ý
                            </Link>
                        </li>
                        <li>
                            <Link to="/ai/budget" onClick={handleLinkClick}>
                                Theo ngân sách
                            </Link>
                        </li>
                        <li>
                            <Link to="/ai/route" onClick={handleLinkClick}>
                                Lộ trình
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link
                    to="/booking"
                    onClick={handleLinkClick}
                    className={styles.navItem}
                >
                    Đặt chỗ
                </Link>

                <Link
                    to="/About"
                    onClick={handleLinkClick}
                    className={styles.navItem}
                >
                    Về chúng tôi
                </Link>
            </nav>

            {/* RIGHT */}
            {user.userId ? (
                <div className={styles.accountMenu}>
                    <button onClick={() => setAdd(true)}>
                        <FaStar />
                    </button>

                    <div className={styles.account} ref={accountRef}>
                        <button onClick={() => setShow(!show)}>
                            <MdAccountCircle />
                        </button>

                        {show && (
                            <div className={styles.accountDropdown}>
                                <button onClick={() => navigate("/profile")}>
                                    <AiFillProfile /> Hồ sơ
                                </button>
                                <button onClick={handleLogout}>
                                    <IoLogInOutline /> Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.authLinks}>
                    <Link to="/register">Đăng ký</Link>
                    <Link to="/Login">Đăng nhập</Link>
                </div>
            )}
        </div>
    );
}
