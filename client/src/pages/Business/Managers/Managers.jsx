import React, { useMemo, useState } from "react";
import styles from "./tem.module.scss";
import {
    FiSearch,
    FiFilter,
    FiCheck,
    FiX,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiEye,
    FiDownload,
    FiBell,
} from "react-icons/fi";
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";

const data = [
    {
        id: 1,
        customer: "Nguyễn Minh",
        avatar: "NM",
        service: "Homestay Núi Cấm",
        category: "Lưu trú",
        date: "12/02/2026",
        time: "14:30",
        people: 2,
        amount: "2.500.000 đ",
        status: "pending",
        priority: "high",
        note: "Yêu cầu phòng view núi",
        contact: "0987 654 321",
    },
    {
        id: 2,
        customer: "Trần Anh",
        avatar: "TA",
        service: "Tour Châu Đốc 1 ngày",
        category: "Tour",
        date: "13/02/2026",
        time: "08:00",
        people: 4,
        amount: "4.200.000 đ",
        status: "confirmed",
        priority: "normal",
        note: "Có người lớn tuổi",
        contact: "0912 345 678",
    },
    {
        id: 3,
        customer: "Lê Hương",
        avatar: "LH",
        service: "Khách sạn Long Xuyên",
        category: "Lưu trú",
        date: "14/02/2026",
        time: "16:00",
        people: 2,
        amount: "1.800.000 đ",
        status: "cancelled",
        priority: "low",
        note: "Huỷ do thay đổi lịch trình",
        contact: "0901 234 567",
    },
    {
        id: 4,
        customer: "Phạm Quang",
        avatar: "PQ",
        service: "Nhà hàng Hải Sản",
        category: "Ẩm thực",
        date: "15/02/2026",
        time: "19:30",
        people: 6,
        amount: "3.500.000 đ",
        status: "pending",
        priority: "high",
        note: "Yêu cầu bàn riêng",
        contact: "0978 123 456",
    },
    {
        id: 5,
        customer: "Hoàng Mai",
        avatar: "HM",
        service: "Thuê xe máy",
        category: "Di chuyển",
        date: "16/02/2026",
        time: "09:00",
        people: 2,
        amount: "400.000 đ",
        status: "confirmed",
        priority: "normal",
        note: "Cần 2 mũ bảo hiểm",
        contact: "0933 444 555",
    },
];

export default function Managers() {
    const [bookings, setBookings] = useState(data);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const pageSize = 5;

    const filtered = useMemo(() => {
        let list = [...bookings];

        if (search) {
            list = list.filter(
                (b) =>
                    b.customer.toLowerCase().includes(search.toLowerCase()) ||
                    b.service.toLowerCase().includes(search.toLowerCase()) ||
                    b.contact.includes(search),
            );
        }

        if (filter !== "all") {
            list = list.filter((b) => b.status === filter);
        }

        return list;
    }, [bookings, search, filter]);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const current = filtered.slice((page - 1) * pageSize, page * pageSize);

    const updateStatus = (id, status) => {
        if (
            status === "cancelled" &&
            !window.confirm("Bạn chắc chắn muốn huỷ booking này?")
        )
            return;

        setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    };

    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Chờ xác nhận";
            case "confirmed":
                return "Đã xác nhận";
            case "cancelled":
                return "Đã huỷ";
            default:
                return status;
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "high":
                return "🔴";
            case "normal":
                return "🟡";
            case "low":
                return "🟢";
            default:
                return "⚪";
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>📋 Quản lý đặt chỗ</h1>
                    <p className={styles.subtitle}>
                        Quản lý và xử lý các booking từ khách hàng
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.exportBtn}>
                        <FiDownload />
                        Xuất Excel
                    </button>
                    <button className={styles.notificationBtn}>
                        <FiBell />
                        <span className={styles.notificationBadge}>3</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div
                        className={styles.statIcon}
                        style={{ background: "#E1F5FE" }}
                    >
                        <FiCalendar color="#0288D1" />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>
                            {bookings.length}
                        </span>
                        <span className={styles.statLabel}>Tổng booking</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div
                        className={styles.statIcon}
                        style={{ background: "#F3E5F5" }}
                    >
                        <HiOutlineStatusOnline color="#7B1FA2" />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>
                            {
                                bookings.filter((b) => b.status === "confirmed")
                                    .length
                            }
                        </span>
                        <span className={styles.statLabel}>Đã xác nhận</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div
                        className={styles.statIcon}
                        style={{ background: "#FFF3E0" }}
                    >
                        <HiOutlineStatusOffline color="#EF6C00" />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>
                            {
                                bookings.filter((b) => b.status === "pending")
                                    .length
                            }
                        </span>
                        <span className={styles.statLabel}>Chờ xác nhận</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div
                        className={styles.statIcon}
                        style={{ background: "#FFEBEE" }}
                    >
                        <FiX color="#D32F2F" />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>
                            {
                                bookings.filter((b) => b.status === "cancelled")
                                    .length
                            }
                        </span>
                        <span className={styles.statLabel}>Đã huỷ</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        className={styles.search}
                        placeholder="Tìm theo tên, dịch vụ hoặc số điện thoại..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className={styles.rightControls}>
                    <div className={styles.filterGroup}>
                        <FiFilter className={styles.filterIcon} />
                        <select
                            className={styles.filter}
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="cancelled">Đã huỷ</option>
                        </select>
                    </div>

                    <button
                        className={styles.refreshBtn}
                        onClick={() => window.location.reload()}
                    >
                        🔄 Làm mới
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.customerCol}>Khách hàng</th>
                            <th>Dịch vụ</th>
                            <th>Thời gian</th>
                            <th>Số người</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.length === 0 ? (
                            <tr>
                                <td colSpan="7" className={styles.noResults}>
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyIcon}>
                                            📭
                                        </div>
                                        <h3>Không tìm thấy booking nào</h3>
                                        <p>
                                            Thử thay đổi bộ lọc hoặc từ khoá tìm
                                            kiếm
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            current.map((b) => (
                                <tr key={b.id} className={styles.tableRow}>
                                    <td>
                                        <div className={styles.customerInfo}>
                                            <div
                                                className={styles.avatar}
                                                style={{
                                                    backgroundColor: `hsl(${(b.id * 137.5) % 360}, 70%, 80%)`,
                                                    color: `hsl(${(b.id * 137.5) % 360}, 70%, 30%)`,
                                                }}
                                            >
                                                {b.avatar}
                                            </div>
                                            <div
                                                className={
                                                    styles.customerDetails
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.customerName
                                                    }
                                                >
                                                    {b.customer}
                                                    <span
                                                        className={
                                                            styles.priority
                                                        }
                                                    >
                                                        {getPriorityIcon(
                                                            b.priority,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={styles.contact}>
                                                    {b.contact}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.serviceInfo}>
                                            <div className={styles.serviceName}>
                                                {b.service}
                                            </div>
                                            <div className={styles.category}>
                                                {b.category}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.timeInfo}>
                                            <div className={styles.date}>
                                                {b.date}
                                            </div>
                                            <div className={styles.time}>
                                                {b.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.peopleCount}>
                                            <span className={styles.peopleIcon}>
                                                👥
                                            </span>
                                            {b.people} người
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.amount}>
                                            {b.amount}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={`${styles.status} ${styles[b.status]}`}
                                        >
                                            <span
                                                className={styles.statusDot}
                                            ></span>
                                            {getStatusText(b.status)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {b.status === "pending" ? (
                                                <>
                                                    <button
                                                        className={
                                                            styles.actionConfirm
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                b.id,
                                                                "confirmed",
                                                            )
                                                        }
                                                        title="Xác nhận booking"
                                                    >
                                                        <FiCheck />
                                                    </button>
                                                    <button
                                                        className={
                                                            styles.actionCancel
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                b.id,
                                                                "cancelled",
                                                            )
                                                        }
                                                        title="Huỷ booking"
                                                    >
                                                        <FiX />
                                                    </button>
                                                </>
                                            ) : (
                                                <span
                                                    className={styles.noActions}
                                                >
                                                    {b.status === "confirmed"
                                                        ? "Đã xử lý"
                                                        : "Đã huỷ"}
                                                </span>
                                            )}
                                            <button
                                                className={styles.actionView}
                                                onClick={() =>
                                                    setSelectedBooking(b)
                                                }
                                                title="Xem chi tiết"
                                            >
                                                <FiEye />
                                            </button>
                                            <button
                                                className={styles.actionMore}
                                                title="Thêm tùy chọn"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {current.length > 0 && (
                <div className={styles.pagination}>
                    <div className={styles.paginationInfo}>
                        Hiển thị {Math.min(pageSize, current.length)} /{" "}
                        {filtered.length} kết quả
                    </div>

                    <div className={styles.paginationControls}>
                        <button
                            className={`${styles.pageBtn} ${styles.prev}`}
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            <FiChevronLeft />
                            Trước
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
                                            className={`${styles.pageNumber} ${
                                                page === pageNum
                                                    ? styles.active
                                                    : ""
                                            }`}
                                            onClick={() => setPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        <button
                            className={`${styles.pageBtn} ${styles.next}`}
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Sau
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {/* Booking Detail Modal */}
            {selectedBooking && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedBooking(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h3>Chi tiết booking #{selectedBooking.id}</h3>
                            <button
                                className={styles.modalClose}
                                onClick={() => setSelectedBooking(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Khách hàng:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.customer}
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Liên hệ:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.contact}
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Dịch vụ:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.service}
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Ngày giờ:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.date} -{" "}
                                    {selectedBooking.time}
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Số người:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.people} người
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Số tiền:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.amount}
                                </span>
                            </div>
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>
                                    Ghi chú:
                                </span>
                                <span className={styles.modalValue}>
                                    {selectedBooking.note}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
