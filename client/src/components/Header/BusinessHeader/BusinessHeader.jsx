import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BusinessHeader.module.scss";
import {
    Bell,
    LogOut,
    ChevronDown,
    BarChart3,
    Calendar,
    Briefcase,
    Home,
} from "lucide-react";
import { useAuth } from "../../../Contexts/Auth/Auth";

const LOGO_URL = new URL("../../../assets/Logo.png", import.meta.url).href;

const NAV_ITEMS = [
    { path: "/business/dashboard", label: "Dashboard", icon: Home },
    { path: "/business/services", label: "Dịch vụ", icon: Briefcase },
    { path: "/business/managers", label: "Quản lý", icon: Calendar },
    { path: "/business/analytics", label: "Phân tích", icon: BarChart3 },
];

const PROFILE_INFO = {
    name: "Doanh nghiệp của tôi",
    role: "Quản lý doanh nghiệp",
};

export default function BusinessHeader() {
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const { logout } = useAuth();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const handleLogoClick = () => navigate("/business");
    const toggleProfileDropdown = () => setShowProfileDropdown((prev) => !prev);

    return (
        <header className={styles.header}>
            {/* Logo Section */}
            <div
                className={styles.logoContainer}
                onClick={handleLogoClick}
                role="button"
                tabIndex={0}
            >
                <img src={LOGO_URL} className={styles.logoIcon} alt="Logo" />
                <div className={styles.logoText}>
                    <h1 className={styles.logoMain}>AGiLand</h1>
                    <span className={styles.logoSub}>Business Portal</span>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className={styles.navMenu}>
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
                    <Link key={path} to={path} className={styles.navItem}>
                        <Icon size={18} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>

            {/* Actions Container */}
            <div className={styles.actionsContainer}>
                {/* Notifications */}
                <button
                    className={styles.notificationBtn}
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    <span className={styles.notificationBadge}>3</span>
                </button>

                {/* Profile Dropdown */}
                <div className={styles.profileDropdown}>
                    <button
                        className={styles.profileInfo}
                        onClick={toggleProfileDropdown}
                        aria-label="Profile menu"
                    >
                        <div className={styles.profileText}>
                            <span className={styles.profileName}>
                                {PROFILE_INFO.name}
                            </span>
                            <span className={styles.profileRole}>
                                {PROFILE_INFO.role}
                            </span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`${styles.chevron} ${
                                showProfileDropdown ? styles.rotated : ""
                            }`}
                        />
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    className={styles.logoutBtn}
                    onClick={logout}
                    aria-label="Logout"
                >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </header>
    );
}
