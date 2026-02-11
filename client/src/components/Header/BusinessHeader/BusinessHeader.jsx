import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BusinessHeader.module.scss";
import {
    Bell,
    LogOut,
    ChevronDown,
    MapPin,
    BarChart3,
    Calendar,
    Briefcase,
    Home,
} from "lucide-react";

export default function BusinessHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const Logo = new URL("../../../assets/Logo.png", import.meta.url).href;
    return (
        <header className={styles.header}>
            {/* Logo with gradient */}
            <div
                className={styles.logoContainer}
                onClick={() => navigate("/business")}
            >
                <img src={Logo} className={styles.logoIcon} alt="" />
                <div className={styles.logoText}>
                    <h1 className={styles.logoMain}>AGiLand</h1>
                    <span className={styles.logoSub}>Business Portal</span>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className={styles.navMenu}>
                <Link to="/business/dashboard" className={styles.navItem}>
                    <Home size={18} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/business/services" className={styles.navItem}>
                    <Briefcase size={18} />
                    <span>Dịch vụ</span>
                </Link>
                <Link to="/business/managers" className={styles.navItem}>
                    <Calendar size={18} />
                    <span>Quan lí</span>
                </Link>
                <Link to="/business/analytics" className={styles.navItem}>
                    <BarChart3 size={18} />
                    <span>Phân tích</span>
                </Link>
            </nav>

            {/* Right Actions */}
            <div className={styles.actionsContainer}>
                {/* Notification Bell with Badge */}
                <button className={styles.notificationBtn}>
                    <Bell size={20} />
                    <span className={styles.notificationBadge}>3</span>
                </button>

                {/* Profile Dropdown */}
                <div className={styles.profileDropdown}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileText}>
                            <span className={styles.profileName}>
                                My Business
                            </span>
                            <span className={styles.profileRole}>
                                Quản lý doanh nghiệp
                            </span>
                        </div>
                        <ChevronDown size={16} className={styles.chevron} />
                    </div>
                </div>

                {/* Logout Button */}
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </header>
    );
}
