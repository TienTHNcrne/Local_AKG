/** @format */

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TravelerHeader.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { useAuth } from "../../../Contexts/Auth/Auth";
import { FaStar } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import TourAi from "../../../pages/Profile/components/Tours/components/TourAi/TourAi";
import { RiGuideFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";

export default function TravlerHeader() {
    const Logo = new URL("../../../assets/Logo.png", import.meta.url).href;
    //---- State and Values ----//
    const { logout } = useAuth();
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const { userId } = useAuth();
    const accountRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
                setOpenDropdown(null);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- Functions ---- //
    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setShow(false);
    };

    const ReturnNameMenu = (Name) => {
        return openDropdown === Name ? styles.show : "";
    };

    const SetNameMenu = (Name) => {
        if (openDropdown === Name) setOpenDropdown(null);
        else toggleDropdown(Name);
    };

    const handleLogout = () => {
        logout();
        setShow(false);
        handleLinkClick();
    };

    // ---- Render ---- //
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

            {/* Logo */}
            <Link to="/" className={styles.logo} onClick={handleLinkClick}>
                <img src={Logo} alt="" />
            </Link>

            {/* Navigation */}
            <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
                {/*---- HOME ---- */}
                <div
                    className={styles.dropdown}
                    onMouseEnter={() =>
                        window.innerWidth > 768 && SetNameMenu("home")
                    }
                    onClick={() => SetNameMenu("home")}
                >
                    <div className={styles.dropdownToggle}>
                        <IoHome />
                        <span>Trang chủ</span>
                        <FaAngleDown className={styles.arrow} />
                    </div>
                    <ul
                        className={`${styles.dropdownMenu} ${ReturnNameMenu("home")}`}
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

                {/*---- EXPLORE ---- */}
                <div
                    className={styles.dropdown}
                    onMouseEnter={() =>
                        window.innerWidth > 768 && SetNameMenu("explore")
                    }
                    onClick={() => SetNameMenu("explore")}
                >
                    <div className={styles.dropdownToggle}>
                        <IoShareSocial />
                        <span>Khám phá</span>
                        <FaAngleDown className={styles.arrow} />
                    </div>
                    <ul
                        className={`${styles.dropdownMenu} ${ReturnNameMenu("explore")}`}
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
                <div className={styles.navItem}>
                    <Link to="/Game" onClick={handleLinkClick}>
                        Game
                    </Link>
                </div>
                {/*---- ABOUT ---- */}
                <div className={styles.navItem}>
                    <Link to="/About" onClick={handleLinkClick}>
                        Về chúng tôi
                    </Link>
                </div>
            </nav>

            {/* User Actions */}
            {userId ? (
                <div className={styles.right}>
                    <button
                        className={styles.iconBtn}
                        onClick={() => setAdd(true)}
                        title="AI Tour"
                    >
                        <FaStar />
                    </button>
                    <button
                        className={styles.iconBtn}
                        onClick={() => navigate("/guide")}
                        title="Hướng dẫn viên"
                    >
                        <RiGuideFill />
                    </button>
                    <div className={styles.account} ref={accountRef}>
                        <button
                            className={styles.accountToggle}
                            onClick={() => setShow(!show)}
                            title="Tài khoản"
                        >
                            <MdAccountCircle />
                        </button>
                        {show && (
                            <div className={styles.accountDropdown}>
                                <Link to="/profile" onClick={handleLinkClick}>
                                    <div className={styles.dropdownItem}>
                                        <AiFillProfile />
                                        <span>Hồ sơ</span>
                                    </div>
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
                    <Link to="/Login" onClick={handleLinkClick}>
                        <button className={styles.signInBtn}>Đăng nhập</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
