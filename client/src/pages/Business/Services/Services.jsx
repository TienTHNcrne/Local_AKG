import React, { useMemo, useState } from "react";
import styles from "./Services.module.scss";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { FaPen, FaPlus, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";

const servicesData = [
    {
        name: "Homestay Núi Cấm",
        views: 820,
        bookings: 56,
        revenue: 12500000,
        status: "Đang hoạt động",
        statusCus: "Đông khách",
        trend: "up",
        category: "Lưu trú",
        rating: 4.8,
        lastUpdated: "2 giờ trước",
    },
    {
        name: "Tour Châu Đốc 1 ngày",
        views: 620,
        bookings: 41,
        revenue: 9200000,
        status: "Đang hoạt động",
        statusCus: "Ổn định",
        trend: "up",
        category: "Tour",
        rating: 4.5,
        lastUpdated: "Hôm nay",
    },
    {
        name: "Quán ăn Bún cá",
        views: 450,
        bookings: 22,
        revenue: 4100000,
        status: "Chưa hoạt động",
        statusCus: "Ít khách",
        trend: "down",
        category: "Ẩm thực",
        rating: 4.2,
        lastUpdated: "1 ngày trước",
    },
    {
        name: "Xe đạp leo núi",
        views: 320,
        bookings: 18,
        revenue: 2800000,
        status: "Đang hoạt động",
        statusCus: "Mới",
        trend: "up",
        category: "Thiết bị",
        rating: 4.7,
        lastUpdated: "3 giờ trước",
    },
    {
        name: "Hướng dẫn viên địa phương",
        views: 510,
        bookings: 35,
        revenue: 6700000,
        status: "Đang hoạt động",
        statusCus: "Ổn định",
        trend: "up",
        category: "Dịch vụ",
        rating: 4.9,
        lastUpdated: "Hôm qua",
    },
];

export default function Services() {
    const [services, setServices] = useState(servicesData);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("revenue");
    const [page, setPage] = useState(1);

    const pageSize = 5;

    const filtered = useMemo(() => {
        let data = [...services];

        // search
        if (search) {
            data = data.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        // filter status
        if (filter !== "all") {
            data = data.filter((s) => s.status === filter);
        }

        // sort
        if (sort === "revenue") {
            data.sort((a, b) => b.revenue - a.revenue);
        }
        if (sort === "views") {
            data.sort((a, b) => b.views - a.views);
        }
        if (sort === "bookings") {
            data.sort((a, b) => b.bookings - a.bookings);
        }

        return data;
    }, [services, search, filter, sort]);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const current = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleDelete = (name) => {
        if (window.confirm(`Xóa dịch vụ "${name}"?`)) {
            setServices(services.filter((s) => s.name !== name));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đang hoạt động":
                return "#10b981";
            case "Chưa hoạt động":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    const getTrendIcon = (trend) => {
        return trend === "up" ? (
            <HiTrendingUp className={styles.trendUp} />
        ) : (
            <HiTrendingDown className={styles.trendDown} />
        );
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Quản lý dịch vụ</h1>
                    <p className={styles.subtitle}>
                        Quản lý và theo dõi hiệu suất các dịch vụ của bạn
                    </p>
                </div>
                <div className={styles.headerStats}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Tổng dịch vụ</span>
                        <span className={styles.statValue}>
                            {services.length}
                        </span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Đang hoạt động</span>
                        <span className={styles.statValue}>
                            {
                                services.filter(
                                    (s) => s.status === "Đang hoạt động",
                                ).length
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className={styles.controls}>
                <div className={styles.leftControls}>
                    <button className={styles.addBtn}>
                        <FaPlus />
                        <span>Thêm dịch vụ</span>
                    </button>

                    <div className={styles.filterGroup}>
                        <div className={styles.filterWrapper}>
                            <FaFilter className={styles.filterIcon} />
                            <select
                                className={styles.filterSelect}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="Đang hoạt động">
                                    Đang hoạt động
                                </option>
                                <option value="Chưa hoạt động">
                                    Chưa hoạt động
                                </option>
                            </select>
                        </div>

                        <div className={styles.filterWrapper}>
                            <FaSortAmountDown className={styles.filterIcon} />
                            <select
                                className={styles.filterSelect}
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="revenue">
                                    Sắp xếp theo doanh thu
                                </option>
                                <option value="views">
                                    Sắp xếp theo lượt xem
                                </option>
                                <option value="bookings">
                                    Sắp xếp theo booking
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.searchContainer}>
                    <IoSearch className={styles.searchIcon} />
                    <input
                        className={styles.search}
                        placeholder="Tìm kiếm dịch vụ..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.nameCol}>Tên dịch vụ</th>
                                <th>Lượt xem</th>
                                <th>Booking</th>
                                <th>Doanh thu</th>
                                <th>Khách hàng</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {current.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className={styles.noResults}
                                    >
                                        <div
                                            className={styles.noResultsContent}
                                        >
                                            <div
                                                className={styles.noResultsIcon}
                                            >
                                                📭
                                            </div>
                                            <p>Không tìm thấy dịch vụ nào</p>
                                            <small>
                                                Thử thay đổi bộ lọc hoặc từ khóa
                                                tìm kiếm
                                            </small>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                current.map((s, i) => (
                                    <tr key={i} className={styles.tableRow}>
                                        <td className={styles.nameCell}>
                                            <div className={styles.serviceName}>
                                                <div
                                                    className={
                                                        styles.serviceIcon
                                                    }
                                                >
                                                    <span>✨</span>
                                                </div>
                                                <div>
                                                    <div
                                                        className={styles.name}
                                                    >
                                                        {s.name}
                                                        <span
                                                            className={
                                                                styles.categoryBadge
                                                            }
                                                        >
                                                            {s.category}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.serviceMeta
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.rating
                                                            }
                                                        >
                                                            ⭐ {s.rating}
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.lastUpdated
                                                            }
                                                        >
                                                            • {s.lastUpdated}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.views}>
                                                {s.views.toLocaleString()}
                                                {getTrendIcon(s.trend)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.bookings}>
                                                <span
                                                    className={
                                                        styles.bookingCount
                                                    }
                                                >
                                                    {s.bookings}
                                                </span>
                                                <span
                                                    className={
                                                        styles.bookingLabel
                                                    }
                                                >
                                                    đặt chỗ
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.revenue}>
                                                <span
                                                    className={
                                                        styles.revenueAmount
                                                    }
                                                >
                                                    {s.revenue.toLocaleString()}
                                                    đ
                                                </span>
                                                <span
                                                    className={
                                                        styles.revenueTrend
                                                    }
                                                >
                                                    {s.trend === "up"
                                                        ? "+12%"
                                                        : "-5%"}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    styles.customerStatus
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.customerStatusBadge
                                                    }
                                                    style={{
                                                        backgroundColor: `${getStatusColor(s.statusCus)}15`,
                                                        color: getStatusColor(
                                                            s.statusCus,
                                                        ),
                                                    }}
                                                >
                                                    {s.statusCus}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={styles.statusBadge}
                                                style={{
                                                    backgroundColor: `${getStatusColor(s.status)}15`,
                                                    color: getStatusColor(
                                                        s.status,
                                                    ),
                                                }}
                                            >
                                                <span
                                                    className={styles.statusDot}
                                                    style={{
                                                        backgroundColor:
                                                            getStatusColor(
                                                                s.status,
                                                            ),
                                                    }}
                                                />
                                                {s.status}
                                            </div>
                                        </td>
                                        <td className={styles.actionButtons}>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() =>
                                                    console.log("View", s.name)
                                                }
                                                title="Xem chi tiết"
                                            >
                                                <IoEyeSharp />
                                            </button>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() =>
                                                    console.log("Edit", s.name)
                                                }
                                                title="Chỉnh sửa"
                                            >
                                                <FaPen />
                                            </button>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() =>
                                                    handleDelete(s.name)
                                                }
                                                title="Xóa"
                                            >
                                                🗑
                                            </button>
                                            <button
                                                className={styles.moreActions}
                                                title="Thêm tùy chọn"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {current.length > 0 && (
                <div className={styles.pagination}>
                    <button
                        className={`${styles.paginationBtn} ${styles.prev}`}
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Trước
                    </button>

                    <div className={styles.pageNumbers}>
                        {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (page <= 3) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = page - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        className={`${styles.pageBtn} ${page === pageNum ? styles.active : ""}`}
                                        onClick={() => setPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            },
                        )}
                        {totalPages > 5 && (
                            <span className={styles.pageDots}>...</span>
                        )}
                    </div>

                    <button
                        className={`${styles.paginationBtn} ${styles.next}`}
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Sau →
                    </button>

                    <div className={styles.pageInfo}>
                        Hiển thị {Math.min(pageSize, current.length)} /{" "}
                        {filtered.length} kết quả
                    </div>
                </div>
            )}
        </div>
    );
}
