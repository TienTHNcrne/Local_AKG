/** @format */

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { useAuth } from "../../Contexts/Auth/Auth";
import { FaStar } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine, RiGuideFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import TourAi from "../../pages/Profile/components/Tours/components/TourAi/TourAi";

export default function Header() {
    const Logo = new URL("../../assets/Logo.png", import.meta.url).href;
    const { logout, userId } = useAuth();

    const [add, setAdd] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const accountRef = useRef(null);

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

    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setShow(false);
    };

    const handleLogout = () => {
        logout();
        handleLinkClick();
    };

    return (
        <header className={styles.header}>
            {add && <TourAi setHide={setAdd} />}

            <div
                className={styles.menuIcon}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </div>

            <Link
                to="/"
                className={styles.logo}
                onClick={handleLinkClick}
                style={{ textDecoration: "none" }}
            >
                <img
                    src={Logo}
                    alt="AGILAND"
                    style={{
                        filter: "brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        WebkitFilter:
                            "brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        backgroundColor: "transparent",
                    }}
                />
            </Link>

            <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
                <div
                    className={styles.dropdown}
                    onMouseEnter={() =>
                        window.innerWidth > 768 && setOpenDropdown("home")
                    }
                    onMouseLeave={() =>
                        window.innerWidth > 768 && setOpenDropdown(null)
                    }
                >
                    <div
                        className={styles.dropdownToggle}
                        onClick={() =>
                            window.innerWidth <= 768 &&
                            setOpenDropdown(
                                openDropdown === "home" ? null : "home",
                            )
                        }
                    >
                        <IoHome />
                        <span>Trang chủ</span>
                        <FaAngleDown className={styles.arrow} />
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
                                Tôn giáo
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.navItem}>
                    <Link to="/Explore/map" onClick={handleLinkClick}>
                        <IoShareSocial />
                        <span>Khám phá</span>
                    </Link>
                </div>

                <div className={styles.navItem}>
                    <Link to="/Game" onClick={handleLinkClick}>
                        Game
                    </Link>
                </div>

                <div className={styles.navItem}>
                    <Link to="/About" onClick={handleLinkClick}>
                        Về chúng tôi
                    </Link>
                </div>
            </nav>

            {userId ? (
                <div className={styles.right}>
                    <button
                        className={styles.iconBtn}
                        onClick={() => setAdd(true)}
                        aria-label="Tạo tour AI"
                    >
                        <FaStar />
                    </button>
                    <button
                        className={styles.iconBtn}
                        onClick={() => navigate("/guide")}
                        aria-label="Hướng dẫn"
                    >
                        <RiGuideFill />
                    </button>
                    <div className={styles.account} ref={accountRef}>
                        <button
                            className={styles.accountToggle}
                            onClick={() => setShow(!show)}
                            aria-label="Tài khoản"
                        >
                            <MdAccountCircle />
                        </button>
                        {show && (
                            <div className={styles.accountDropdown}>
                                <Link
                                    to="/profile"
                                    onClick={handleLinkClick}
                                    className={styles.dropdownItem}
                                >
                                    <AiFillProfile />
                                    <span>Hồ sơ</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={styles.dropdownBtn}
                                >
                                    <div className={styles.dropdownItem}>
                                        <IoLogInOutline />
                                        <span>Đăng xuất</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.rightB}>
                    <Link to="/register" onClick={handleLinkClick}>
                        <button className={styles.signUpBtn}>Đăng ký</button>
                    </Link>
                    <Link to="/login" onClick={handleLinkClick}>
                        <button className={styles.signInBtn}>Đăng nhập</button>
                    </Link>
                </div>
            )}
        </header>
    );
}
