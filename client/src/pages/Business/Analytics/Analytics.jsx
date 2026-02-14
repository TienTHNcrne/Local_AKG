import React, { useState } from "react";
import styles from "./Analytics.module.scss";
import {
    FiUsers,
    FiDollarSign,
    FiClock,
    FiTrendingUp,
    FiPieChart,
    FiMap,
    FiCalendar,
    FiDownload,
    FiRefreshCw,
    FiChevronRight,
    FiActivity,
    FiTarget,
} from "react-icons/fi";
import { HiOutlineChartBar, HiOutlineChartPie } from "react-icons/hi";
import { MdLocationOn, MdInsights } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Analytics() {
    const [timeRange, setTimeRange] = useState("today");
    const [activeTab, setActiveTab] = useState("overview");

    // Chart data simulation
    const hourData = [
        65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 85, 95, 110, 105, 95, 85, 120,
        150, 180, 200,
    ];
    const areaData = [
        { name: "Núi Cấm", value: 42, color: "#10B981" },
        { name: "Châu Đốc", value: 35, color: "#3B82F6" },
        { name: "Long Xuyên", value: 28, color: "#8B5CF6" },
        { name: "Bảy Núi", value: 22, color: "#F59E0B" },
        { name: "Miếu Bà Chúa Xứ", value: 18, color: "#EF4444" },
    ];

    const trends = [
        {
            id: 1,
            title: "Núi Cấm tăng 42% lượt tìm kiếm",
            icon: "📈",
            trend: "up",
            change: 42,
        },
        {
            id: 2,
            title: "Khách trẻ tập trung Châu Đốc",
            icon: "🎯",
            trend: "up",
            change: 28,
        },
        {
            id: 3,
            title: "Cuối tuần doanh thu tăng 30%",
            icon: "💰",
            trend: "up",
            change: 30,
        },
        {
            id: 4,
            title: "Mùa khô tăng lượng khách",
            icon: "☀️",
            trend: "up",
            change: 25,
        },
        {
            id: 5,
            title: "Homestay được ưa chuộng",
            icon: "🏠",
            trend: "up",
            change: 38,
        },
    ];

    const popularServices = [
        { name: "Homestay Núi Cấm", bookings: 156, revenue: "45M", growth: 12 },
        { name: "Tour Châu Đốc", bookings: 128, revenue: "32M", growth: 8 },
        { name: "Xe máy thuê", bookings: 89, revenue: "8M", growth: 15 },
        { name: "Hướng dẫn viên", bookings: 67, revenue: "12M", growth: 5 },
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <FiActivity /> Phân tích du lịch
                    </h1>
                    <p className={styles.subtitle}>
                        Theo dõi hiệu suất và xu hướng du lịch An Giang
                    </p>
                </div>

                <div className={styles.headerControls}>
                    <div className={styles.timeFilter}>
                        <FiCalendar className={styles.filterIcon} />
                        <select
                            className={styles.timeSelect}
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="today">Hôm nay</option>
                            <option value="week">Tuần này</option>
                            <option value="month">Tháng này</option>
                            <option value="quarter">Quý này</option>
                            <option value="year">Năm nay</option>
                        </select>
                    </div>

                    <button className={styles.exportBtn}>
                        <FiDownload /> Xuất báo cáo
                    </button>

                    <button className={styles.refreshBtn}>
                        <FiRefreshCw />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                    <FiPieChart /> Tổng quan
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "revenue" ? styles.active : ""}`}
                    onClick={() => setActiveTab("revenue")}
                >
                    <FiDollarSign /> Doanh thu
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "customer" ? styles.active : ""}`}
                    onClick={() => setActiveTab("customer")}
                >
                    <FiUsers /> Khách hàng
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "geography" ? styles.active : ""}`}
                    onClick={() => setActiveTab("geography")}
                >
                    <FiMap /> Khu vực
                </button>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div
                            className={styles.statIcon}
                            style={{ background: "#DBEAFE" }}
                        >
                            <FiUsers color="#1D4ED8" />
                        </div>
                        <div
                            className={styles.statTrend}
                            style={{ color: "#10B981" }}
                        >
                            <FiTrendingUp /> +12.5%
                        </div>
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>1,284</div>
                        <div className={styles.statLabel}>Khách hôm nay</div>
                    </div>
                    <div className={styles.statComparison}>
                        <span className={styles.comparisonText}>
                            Hơn hôm qua 142 khách
                        </span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div
                            className={styles.statIcon}
                            style={{ background: "#DCFCE7" }}
                        >
                            <FiDollarSign color="#065F46" />
                        </div>
                        <div
                            className={styles.statTrend}
                            style={{ color: "#10B981" }}
                        >
                            <FiTrendingUp /> +8.3%
                        </div>
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>32.5M</div>
                        <div className={styles.statLabel}>
                            Doanh thu hôm nay
                        </div>
                    </div>
                    <div className={styles.statComparison}>
                        <span className={styles.comparisonText}>
                            Tăng 2.5M so với hôm qua
                        </span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div
                            className={styles.statIcon}
                            style={{ background: "#FEF3C7" }}
                        >
                            <FiClock color="#92400E" />
                        </div>
                        <div
                            className={styles.statTrend}
                            style={{ color: "#10B981" }}
                        >
                            <FiTrendingUp /> +5.2%
                        </div>
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>18h – 21h</div>
                        <div className={styles.statLabel}>Giờ cao điểm</div>
                    </div>
                    <div className={styles.statComparison}>
                        <span className={styles.comparisonText}>
                            Đỉnh điểm: 200 khách/giờ
                        </span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div
                            className={styles.statIcon}
                            style={{ background: "#F3E8FF" }}
                        >
                            <FiTarget color="#7C3AED" />
                        </div>
                        <div
                            className={styles.statTrend}
                            style={{ color: "#EF4444" }}
                        >
                            <FiTrendingUp /> -3.1%
                        </div>
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>650.000đ</div>
                        <div className={styles.statLabel}>
                            Chi tiêu TB/khách
                        </div>
                    </div>
                    <div className={styles.statComparison}>
                        <span className={styles.comparisonText}>
                            Giảm 21.000đ so với tuần trước
                        </span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.chartsSection}>
                {/* Visitors by Hour Chart */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <div className={styles.chartTitle}>
                            <HiOutlineChartBar />
                            <h3>Lượt khách theo giờ</h3>
                        </div>
                        <button className={styles.chartOptions}>
                            <BsThreeDotsVertical />
                        </button>
                    </div>
                    <div className={styles.chartContent}>
                        <div className={styles.hourChart}>
                            {hourData.map((value, index) => (
                                <div key={index} className={styles.hourBar}>
                                    <div
                                        className={styles.bar}
                                        style={{
                                            height: `${(value / 250) * 100}%`,
                                            background:
                                                index >= 18 && index <= 21
                                                    ? "linear-gradient(to top, #10B981, #34D399)"
                                                    : "linear-gradient(to top, #3B82F6, #60A5FA)",
                                        }}
                                    >
                                        <span className={styles.barValue}>
                                            {value}
                                        </span>
                                    </div>
                                    <span className={styles.hourLabel}>
                                        {index.toString().padStart(2, "0")}:00
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.chartLegend}>
                            <div className={styles.legendItem}>
                                <span
                                    className={styles.legendColor}
                                    style={{ background: "#3B82F6" }}
                                ></span>
                                <span>Giờ thường</span>
                            </div>
                            <div className={styles.legendItem}>
                                <span
                                    className={styles.legendColor}
                                    style={{ background: "#10B981" }}
                                ></span>
                                <span>Giờ cao điểm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Area Popularity Chart */}
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <div className={styles.chartTitle}>
                            <HiOutlineChartPie />
                            <h3>Khu vực được quan tâm</h3>
                        </div>
                        <button className={styles.chartOptions}>
                            <BsThreeDotsVertical />
                        </button>
                    </div>
                    <div className={styles.chartContent}>
                        <div className={styles.pieChart}>
                            <div className={styles.pieVisual}>
                                {areaData.map((area, index) => {
                                    const percentage = (area.value / 145) * 100;
                                    const rotation = areaData
                                        .slice(0, index)
                                        .reduce(
                                            (acc, curr) =>
                                                acc + (curr.value / 145) * 360,
                                            0,
                                        );
                                    return (
                                        <div
                                            key={area.name}
                                            className={styles.pieSegment}
                                            style={{
                                                background: `conic-gradient(${area.color} 0% ${percentage}%, transparent ${percentage}% 100%)`,
                                                transform: `rotate(${rotation}deg)`,
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                            <div className={styles.pieLabels}>
                                {areaData.map((area) => (
                                    <div
                                        key={area.name}
                                        className={styles.pieLabel}
                                    >
                                        <span
                                            className={styles.labelColor}
                                            style={{ background: area.color }}
                                        ></span>
                                        <div className={styles.labelContent}>
                                            <span className={styles.labelName}>
                                                {area.name}
                                            </span>
                                            <span className={styles.labelValue}>
                                                {area.value}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomSection}>
                {/* AI Insights */}
                <div className={styles.aiCard}>
                    <div className={styles.aiHeader}>
                        <div className={styles.aiTitle}>
                            <MdInsights />
                            <h3>Nhận định từ AI</h3>
                        </div>
                        <div className={styles.aiBadge}>MỚI CẬP NHẬT</div>
                    </div>
                    <div className={styles.aiContent}>
                        <div className={styles.trendsList}>
                            {trends.map((trend) => (
                                <div
                                    key={trend.id}
                                    className={styles.trendItem}
                                >
                                    <div className={styles.trendIcon}>
                                        {trend.icon}
                                    </div>
                                    <div className={styles.trendContent}>
                                        <div className={styles.trendTitle}>
                                            {trend.title}
                                        </div>
                                        <div className={styles.trendMeta}>
                                            <span
                                                className={`${styles.trendChange} ${trend.trend === "up" ? styles.up : styles.down}`}
                                            >
                                                {trend.trend === "up"
                                                    ? "📈"
                                                    : "📉"}{" "}
                                                {trend.change}%
                                            </span>
                                            <span className={styles.trendTime}>
                                                2 giờ trước
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.aiFooter}>
                        <button className={styles.aiAction}>
                            Xem chi tiết phân tích
                            <FiChevronRight />
                        </button>
                    </div>
                </div>

                {/* Popular Services */}
                <div className={styles.servicesCard}>
                    <div className={styles.servicesHeader}>
                        <h3>Dịch vụ phổ biến</h3>
                        <select className={styles.servicesFilter}>
                            <option>Tuần này</option>
                            <option>Tháng này</option>
                            <option>Quý này</option>
                        </select>
                    </div>
                    <div className={styles.servicesList}>
                        {popularServices.map((service, index) => (
                            <div
                                key={service.name}
                                className={styles.serviceItem}
                            >
                                <div className={styles.serviceRank}>
                                    {index + 1}
                                </div>
                                <div className={styles.serviceInfo}>
                                    <div className={styles.serviceName}>
                                        {service.name}
                                    </div>
                                    <div className={styles.serviceStats}>
                                        <span className={styles.stat}>
                                            {service.bookings} bookings
                                        </span>
                                        <span className={styles.stat}>•</span>
                                        <span className={styles.stat}>
                                            {service.revenue}đ
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.serviceGrowth} ${service.growth > 10 ? styles.high : styles.low}`}
                                >
                                    +{service.growth}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.servicesFooter}>
                        <button className={styles.servicesAction}>
                            Xem tất cả dịch vụ
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.quickStats}>
                <div className={styles.quickStat}>
                    <div
                        className={styles.quickIcon}
                        style={{ background: "#FEF3C7" }}
                    >
                        <FiCalendar color="#92400E" />
                    </div>
                    <div>
                        <div className={styles.quickValue}>Thứ 7, CN</div>
                        <div className={styles.quickLabel}>
                            Doanh thu cao nhất
                        </div>
                    </div>
                </div>
                <div className={styles.quickStat}>
                    <div
                        className={styles.quickIcon}
                        style={{ background: "#DBEAFE" }}
                    >
                        <FiUsers color="#1D4ED8" />
                    </div>
                    <div>
                        <div className={styles.quickValue}>18-35 tuổi</div>
                        <div className={styles.quickLabel}>Độ tuổi chủ yếu</div>
                    </div>
                </div>
                <div className={styles.quickStat}>
                    <div
                        className={styles.quickIcon}
                        style={{ background: "#DCFCE7" }}
                    >
                        <FiDollarSign color="#065F46" />
                    </div>
                    <div>
                        <div className={styles.quickValue}>120M đ</div>
                        <div className={styles.quickLabel}>Doanh thu tuần</div>
                    </div>
                </div>
                <div className={styles.quickStat}>
                    <div
                        className={styles.quickIcon}
                        style={{ background: "#F3E8FF" }}
                    >
                        <MdLocationOn color="#7C3AED" />
                    </div>
                    <div>
                        <div className={styles.quickValue}>TP.HCM</div>
                        <div className={styles.quickLabel}>
                            Nguồn khách chính
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
