/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TinhHoa.module.scss";
import Place from "./components/Place/Place.jsx";
import Festival from "./components/Festival/Festival.jsx";

import AddFes from "./components/Festival/components/addFes/AddFes.jsx";
export default function TinhHoa() {
    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState("All");
    const [form, setForm] = useState("place"); // tab hiện tại
    const [placeData, setPlaceData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const normalize = (str) =>
        str
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") || "";

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/gps/all`
                );
                setPlaceData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch place:", err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchEvent = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/festival/GetAll`
                );
                setEventData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch event:", err.message);
            } finally {
                setLoading(false);
            }
        };

        if (form === "place" && placeData.length === 0) fetchPlace();
        if (form === "event" && eventData.length === 0) fetchEvent();
    }, [form]);

    const currentData =
        form === "place" ? placeData : form === "event" ? eventData : [];

    const filteredData = currentData.filter((item) => {
        const name = normalize(item.name);
        const category = normalize(item.category);
        const desc = normalize(item.description);
        const key = normalize(keyword);

        const matchKeyword =
            name.includes(key) || category.includes(key) || desc.includes(key);
        const matchFilter =
            filter === "All" || normalize(item.category) === normalize(filter);

        return matchKeyword && matchFilter;
    });

    return (
        <div className={styles.container}>
            {/* Tabs chọn form */}
            <div className={styles.tabs}>
                <button
                    className={form === "place" ? styles.active : ""}
                    onClick={() => setForm("place")}
                >
                    Địa điểm
                </button>
                <button
                    className={form === "food" ? styles.active : ""}
                    onClick={() => setForm("food")}
                >
                    Món ăn
                </button>
                <button
                    className={form === "event" ? styles.active : ""}
                    onClick={() => setForm("event")}
                >
                    Lễ hội
                </button>
            </div>

            {/* Search + Filter */}
            <div className={styles.header}>
                <div className={styles.second}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {form === "place" ? (
                        <div className={styles.filter}>
                            <select
                                name="filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">Tất cả</option>
                                <option value="Di tích lịch sử">
                                    Di tích lịch sử
                                </option>
                                <option value="Du lịch tâm linh">
                                    Du lịch tâm linh
                                </option>
                                <option value="Danh lam thắng cảnh">
                                    Danh lam thắng cảnh
                                </option>
                                <option value="Ẩm thực">Ẩm thực</option>
                            </select>
                        </div>
                    ) : form === "event" || form === "food" ? (
                        <button onClick={() => setShowAdd(true)}>
                            Add Data
                        </button>
                    ) : null}
                </div>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : filteredData.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : form === "place" ? (
                <Place filteredData={filteredData} />
            ) : form === "food" ? (
                <p>📌 Danh sách món ăn sẽ hiển thị ở đây.</p>
            ) : form === "event" ? (
                <Festival filteredData={filteredData} />
            ) : null}

            {showAdd && form === "event" && <AddFes setShow={setShowAdd} />}
        </div>
    );
}
