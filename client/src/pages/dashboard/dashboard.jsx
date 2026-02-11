import React from "react";
import styles from "./Dashboard.module.scss";
import MapShow from "./components/mapShow.jsx/mapShow.jsx";
import {
    FiUsers,
    FiTrendingUp,
    FiDollarSign,
    FiMapPin,
    FiBarChart2,
    FiActivity,
    FiEye,
    FiCalendar,
    FiShoppingBag,
} from "react-icons/fi";
import { AiOutlineRocket } from "react-icons/ai";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Digital Twin Dashboard</h1>
                <p className={styles.subtitle}>
                    Real-time analytics and insights
                </p>
            </div>

            {/* Stats Cards */}
            <div className={styles.cards}>
                <div className={`${styles.card} ${styles.card1}`}>
                    <div className={styles.cardIcon}>
                        <FiUsers size={24} />
                    </div>
                    <div className={styles.cardContent}>
                        <h4>Lượt khách hôm nay</h4>
                        <p className={styles.cardValue}>1,247</p>
                        <span className={styles.cardTrend}>
                            <FiTrendingUp /> +12.5%
                        </span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.card2}`}>
                    <div className={styles.cardIcon}>
                        <FiMapPin size={24} />
                    </div>
                    <div className={styles.cardContent}>
                        <h4>Điểm đến hot</h4>
                        <p className={styles.cardValue}>Hồ Hoàn Kiếm</p>
                        <span className={styles.cardTag}>Trending</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.card3}`}>
                    <div className={styles.cardIcon}>
                        <FiDollarSign size={24} />
                    </div>
                    <div className={styles.cardContent}>
                        <h4>Doanh thu</h4>
                        <p className={styles.cardValue}>$24,580</p>
                        <span className={styles.cardTrend}>
                            <FiTrendingUp /> +8.2%
                        </span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.card4}`}>
                    <div className={styles.cardIcon}>
                        <FiActivity size={24} />
                    </div>
                    <div className={styles.cardContent}>
                        <h4>Tăng trưởng</h4>
                        <p className={styles.cardValue}>24.7%</p>
                        <span className={styles.cardProgress}>
                            <div className={styles.progressBar}></div>
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.main}>
                {/* Map Section */}
                <div className={styles.mapBox}>
                    <div className={styles.sectionHeader}>
                        <h3>
                            <FiMapPin /> Bản đồ Digital Twin
                        </h3>
                        <select className={styles.filterSelect}>
                            <option>Hôm nay</option>
                            <option>Tuần này</option>
                            <option>Tháng này</option>
                        </select>
                    </div>
                    <div className={styles.mapContainer}>
                        <MapShow />
                        <div className={styles.mapOverlay}>
                            <span className={styles.mapBadge}>Live View</span>
                        </div>
                    </div>
                </div>

                {/* Charts & AI Section */}
                <div className={styles.right}>
                    {/* Visitor Behavior Chart */}
                    <div className={styles.chartBox}>
                        <div className={styles.sectionHeader}>
                            <h3>
                                <FiBarChart2 /> Hành vi du khách
                            </h3>
                        </div>
                        <div className={styles.chartContainer}>
                            {/* Mock Chart Bars */}
                            <div className={styles.chartBars}>
                                {[65, 40, 75, 50, 90, 60, 85].map(
                                    (height, index) => (
                                        <div
                                            key={index}
                                            className={styles.chartBar}
                                        >
                                            <div
                                                className={styles.barFill}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <span>Day {index + 1}</span>
                                        </div>
                                    ),
                                )}
                            </div>
                            <div className={styles.chartLegend}>
                                <span className={styles.legendItem}>
                                    <div className={styles.legendColor1}></div>
                                    Mobile
                                </span>
                                <span className={styles.legendItem}>
                                    <div className={styles.legendColor2}></div>
                                    Desktop
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className={styles.aiBox}>
                        <div className={styles.sectionHeader}>
                            <h3>
                                <AiOutlineRocket /> Gợi ý từ AI
                            </h3>
                        </div>
                        <div className={styles.aiSuggestions}>
                            <div className={styles.suggestionItem}>
                                <div className={styles.suggestionIcon}>💡</div>
                                <div className={styles.suggestionContent}>
                                    <p>Tăng quảng cáo vào 18:00 - 20:00</p>
                                    <small>
                                        Thời điểm du khách online nhiều nhất
                                    </small>
                                </div>
                            </div>
                            <div className={styles.suggestionItem}>
                                <div className={styles.suggestionIcon}>🎯</div>
                                <div className={styles.suggestionContent}>
                                    <p>Ưu đãi đặc biệt cuối tuần</p>
                                    <small>Tăng 30% đặt chỗ dự kiến</small>
                                </div>
                            </div>
                            <div className={styles.suggestionItem}>
                                <div className={styles.suggestionIcon}>📱</div>
                                <div className={styles.suggestionContent}>
                                    <p>Tối ưu trải nghiệm mobile</p>
                                    <small>68% truy cập từ điện thoại</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Table */}
            <div className={styles.tableBox}>
                <div className={styles.sectionHeader}>
                    <h3>
                        <FiShoppingBag /> Hiệu suất dịch vụ của bạn
                    </h3>
                    <button className={styles.exportBtn}>Xuất Excel</button>
                </div>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Chi nhánh</th>
                                <th>
                                    <FiEye /> Lượt xem
                                </th>
                                <th>
                                    <FiCalendar /> Đặt chỗ
                                </th>
                                <th>
                                    <FiDollarSign /> Doanh thu
                                </th>
                                <th>Tỷ lệ chuyển đổi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    branch: "Hà Nội Center",
                                    views: "12,458",
                                    bookings: "1,247",
                                    revenue: "$12,450",
                                    conversion: "10.0%",
                                },
                                {
                                    branch: "Sài Gòn Plaza",
                                    views: "8,942",
                                    bookings: "892",
                                    revenue: "$8,920",
                                    conversion: "9.8%",
                                },
                                {
                                    branch: "Đà Nẵng Bay",
                                    views: "6,758",
                                    bookings: "743",
                                    revenue: "$7,430",
                                    conversion: "11.0%",
                                },
                                {
                                    branch: "Hạ Long View",
                                    views: "4,231",
                                    bookings: "423",
                                    revenue: "$4,230",
                                    conversion: "10.0%",
                                },
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={styles.branchInfo}>
                                            <div
                                                className={styles.branchAvatar}
                                            >
                                                {item.branch.charAt(0)}
                                            </div>
                                            {item.branch}
                                        </div>
                                    </td>
                                    <td>{item.views}</td>
                                    <td>{item.bookings}</td>
                                    <td className={styles.revenue}>
                                        {item.revenue}
                                    </td>
                                    <td>
                                        <div className={styles.conversionBadge}>
                                            {item.conversion}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
