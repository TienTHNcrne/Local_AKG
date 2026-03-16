/** @format */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { IoHome, IoShareSocial, IoLogInOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { FaStar, FaAngleDown } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine, RiGuideFill } from "react-icons/ri";

import styles from "./TravelerHeader.module.scss";
import { useAuth } from "../../../Contexts/Auth/Auth";
import TourAi from "../../../pages/Auth/Profile/components/Tours/components/TourAi/TourAi";

const MOBILE_BP = 768;

const NAV_ITEMS = [
    {
        key: "province",
        label: "Hồ sơ tỉnh",
        icon: <IoHome />,
        path: "/provides",
    },
    {
        key: "explore",
        label: "Khám phá",
        icon: <IoShareSocial />,
        children: [
            { label: "Bản đồ số", to: "/explore/map" },
            { label: "Điểm đến", to: "/explore/tinh-hoa/place" },
            { label: "Ẩm thực", to: "/explore/tinh-hoa/food" },
            { label: "Lễ hội", to: "/explore/tinh-hoa/event" },
        ],
    },
    {
        key: "ai",
        label: "Lịch trình AI",
        icon: <RiGuideFill />,
        children: [
            { label: "Gợi ý lộ trình", to: "/ai/suggest" },
            { label: "Lịch sử lộ trình", to: "/ai/historic-tour" },
        ],
    },
    {
        key: "booking",
        label: "Đặt chỗ",
        children: [
            { label: "Lưu trú", to: "/booking/stays" },
            { label: "Ăn uống", to: "/booking/eat" },
            { label: "Trải nghiệm", to: "/booking/exp" },
            { label: "Vé tham quan", to: "/booking/tickets" },
        ],
    },
    { key: "about", label: "Về chúng tôi", path: "/About" },
];

/* ── Hook nhận biết mobile ── */
function useIsMobile(bp = MOBILE_BP) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < bp);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [bp]);

    return isMobile;
}

export default function TravelerHeader() {
    const Logo = new URL("../../../assets/Logo.png", import.meta.url).href;
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const accountRef = useRef(null);

    const isMobile = useIsMobile();

    const [add, setAdd] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    /* Đóng account dropdown khi click ngoài */
    useEffect(() => {
        const handler = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target))
                setShowAccount(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Đóng menu khi chuyển route */
    useEffect(() => {
        setMenuOpen(false);
        setOpenDropdown(null);
    }, [location.pathname]);

    /* Khoá scroll khi drawer mở */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    /* Đóng drawer khi resize về desktop */
    useEffect(() => {
        if (!isMobile) {
            setMenuOpen(false);
            setOpenDropdown(null);
        }
    }, [isMobile]);

    const toggleDropdown = (key) =>
        setOpenDropdown((prev) => (prev === key ? null : key));

    const handleLinkClick = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
        setShowAccount(false);
    };

    return (
        <>
            {add && <TourAi setHide={setAdd} />}

            <header className={styles.header}>
                {/* Logo */}
                <div
                    className={styles.logoContainer}
                    onClick={() => navigate("/")}
                >
                    <img src={Logo} className={styles.logoIcon} alt="AGiLand" />
                    {user.userId && (
                        <div className={styles.logoText}>
                            <h1 className={styles.logoMain}>AGiLand</h1>
                            <span className={styles.logoSub}>
                                Traveler Portal
                            </span>
                        </div>
                    )}
                </div>

                {/* Desktop nav — chỉ render khi KHÔNG phải mobile */}
                {!isMobile && (
                    <nav className={styles.navMenu}>
                        {NAV_ITEMS.map((item) =>
                            item.children ? (
                                <div
                                    key={item.key}
                                    className={clsx(styles.navItem, {
                                        [styles.activeNav]:
                                            openDropdown === item.key,
                                    })}
                                    onMouseEnter={() =>
                                        setOpenDropdown(item.key)
                                    }
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <div className={styles.dropdownToggle}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                        <FaAngleDown
                                            className={clsx(styles.chevron, {
                                                [styles.chevronOpen]:
                                                    openDropdown === item.key,
                                            })}
                                        />
                                    </div>
                                    <ul
                                        className={clsx(styles.dropdownMenu, {
                                            [styles.dropdownVisible]:
                                                openDropdown === item.key,
                                        })}
                                    >
                                        {item.children.map((c) => (
                                            <li key={c.to}>
                                                <Link
                                                    to={c.to}
                                                    onClick={handleLinkClick}
                                                >
                                                    {c.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div
                                    key={item.key}
                                    className={styles.navItem}
                                    onClick={() => {
                                        navigate(item.path);
                                        handleLinkClick();
                                    }}
                                >
                                    <div className={styles.dropdownToggle}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                </div>
                            ),
                        )}
                    </nav>
                )}

                {/* Right actions */}
                <div className={styles.actions}>
                    {user.userId ? (
                        <>
                            {/* Star button — ẩn trên mobile (có trong drawer) */}
                            {!isMobile && (
                                <button
                                    className={styles.iconBtn}
                                    onClick={() => setAdd(true)}
                                    aria-label="Tour AI"
                                >
                                    <FaStar />
                                </button>
                            )}

                            <div className={styles.account} ref={accountRef}>
                                <button
                                    className={styles.iconBtn}
                                    onClick={() => setShowAccount((v) => !v)}
                                    aria-label="Tài khoản"
                                >
                                    <MdAccountCircle
                                        className={styles.avatarIcon}
                                    />
                                </button>

                                {showAccount && (
                                    <div className={styles.accountDropdown}>
                                        <button
                                            onClick={() => {
                                                navigate("/profile");
                                                handleLinkClick();
                                            }}
                                        >
                                            <AiFillProfile /> Hồ sơ
                                        </button>
                                        <button onClick={logout}>
                                            <IoLogInOutline /> Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* Auth links — chỉ desktop */
                        !isMobile && (
                            <div className={styles.authLinks}>
                                <Link to="/register">Đăng ký</Link>
                                <Link to="/Login">Đăng nhập</Link>
                            </div>
                        )
                    )}

                    {/* Hamburger — CHỈ render khi mobile */}
                    {isMobile && (
                        <button
                            className={styles.hamburger}
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                        >
                            {menuOpen ? <RiCloseLine /> : <RiMenu3Line />}
                        </button>
                    )}
                </div>
            </header>

            {/* ── MOBILE DRAWER — chỉ render khi mobile ── */}
            {isMobile && (
                <>
                    <div
                        className={clsx(styles.backdrop, {
                            [styles.backdropVisible]: menuOpen,
                        })}
                        onClick={() => setMenuOpen(false)}
                    />

                    <aside
                        className={clsx(styles.drawer, {
                            [styles.drawerOpen]: menuOpen,
                        })}
                    >
                        {/* Drawer header */}
                        <div className={styles.drawerHeader}>
                            <img
                                src={Logo}
                                className={styles.drawerLogo}
                                alt="AGiLand"
                            />
                            <button
                                className={styles.drawerClose}
                                onClick={() => setMenuOpen(false)}
                            >
                                <RiCloseLine />
                            </button>
                        </div>

                        {/* User info */}
                        {user.userId && (
                            <div className={styles.drawerUser}>
                                <MdAccountCircle
                                    className={styles.drawerAvatar}
                                />
                                <div>
                                    <p className={styles.drawerUserName}>
                                        Xin chào!
                                    </p>
                                    <p className={styles.drawerUserSub}>
                                        Traveler
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Nav */}
                        <nav className={styles.drawerNav}>
                            {NAV_ITEMS.map((item) =>
                                item.children ? (
                                    <div
                                        key={item.key}
                                        className={styles.drawerGroup}
                                    >
                                        <button
                                            className={styles.drawerGroupBtn}
                                            onClick={() =>
                                                toggleDropdown(item.key)
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.drawerGroupLeft
                                                }
                                            >
                                                {item.icon && (
                                                    <span
                                                        className={
                                                            styles.drawerIcon
                                                        }
                                                    >
                                                        {item.icon}
                                                    </span>
                                                )}
                                                {item.label}
                                            </span>
                                            <FaAngleDown
                                                className={clsx(
                                                    styles.drawerChevron,
                                                    {
                                                        [styles.drawerChevronOpen]:
                                                            openDropdown ===
                                                            item.key,
                                                    },
                                                )}
                                            />
                                        </button>

                                        <ul
                                            className={clsx(styles.drawerSub, {
                                                [styles.drawerSubOpen]:
                                                    openDropdown === item.key,
                                            })}
                                        >
                                            {item.children.map((c) => (
                                                <li key={c.to}>
                                                    <Link
                                                        to={c.to}
                                                        className={clsx(
                                                            styles.drawerSubLink,
                                                            {
                                                                [styles.drawerSubActive]:
                                                                    location.pathname ===
                                                                    c.to,
                                                            },
                                                        )}
                                                        onClick={
                                                            handleLinkClick
                                                        }
                                                    >
                                                        {c.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.key}
                                        to={item.path}
                                        className={clsx(styles.drawerLink, {
                                            [styles.drawerLinkActive]:
                                                location.pathname === item.path,
                                        })}
                                        onClick={handleLinkClick}
                                    >
                                        {item.icon && (
                                            <span className={styles.drawerIcon}>
                                                {item.icon}
                                            </span>
                                        )}
                                        {item.label}
                                    </Link>
                                ),
                            )}
                        </nav>

                        {/* Footer */}
                        <div className={styles.drawerFooter}>
                            {user.userId ? (
                                <>
                                    <button
                                        className={styles.drawerFooterBtn}
                                        onClick={() => setAdd(true)}
                                    >
                                        <FaStar /> Tour AI
                                    </button>
                                    <button
                                        className={styles.drawerFooterBtn}
                                        onClick={() => {
                                            navigate("/profile");
                                            handleLinkClick();
                                        }}
                                    >
                                        <AiFillProfile /> Hồ sơ
                                    </button>
                                    <button
                                        className={clsx(
                                            styles.drawerFooterBtn,
                                            styles.drawerLogout,
                                        )}
                                        onClick={logout}
                                    >
                                        <IoLogInOutline /> Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <div className={styles.drawerAuth}>
                                    <Link
                                        to="/register"
                                        className={styles.drawerAuthOutline}
                                        onClick={handleLinkClick}
                                    >
                                        Đăng ký
                                    </Link>
                                    <Link
                                        to="/Login"
                                        className={styles.drawerAuthFill}
                                        onClick={handleLinkClick}
                                    >
                                        Đăng nhập
                                    </Link>
                                </div>
                            )}
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}
