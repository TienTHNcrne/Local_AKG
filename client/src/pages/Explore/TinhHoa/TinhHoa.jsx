/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TinhHoa.module.scss";
import Place from "./components/Place/Place";

export default function TinhHoa() {
    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState("All");
    const [data, setData] = useState([]);
    const [form, setForm] = useState("place"); // tab hiện tại

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/gps/all`
                );
                setData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch:", err.message);
            }
        };
        fetchData();
    }, []);

    // Lọc dữ liệu theo keyword + filter
    const filteredData = data.filter((item) => {
        const name = item.name?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";
        const desc = item.description?.toLowerCase() || "";
        const key = keyword.toLowerCase();

        const matchKeyword =
            name.includes(key) || category.includes(key) || desc.includes(key);

        const matchFilter =
            filter === "All" ||
            item.category?.toLowerCase() === filter.toLowerCase();

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
                    Sự kiện
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
                    {form === "place" && (
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
                    )}
                </div>
            </div>

            {/* Render theo form */}
            {form === "place" && (
                <Place
                    setKeyword={setKeyword}
                    setFilter={setFilter}
                    keyword={keyword}
                    filter={filter}
                    filteredData={filteredData}
                />
            )}
            {form === "food" && <p>📌 Danh sách món ăn sẽ hiển thị ở đây.</p>}
            {form === "event" && <p>📌 Danh sách sự kiện sẽ hiển thị ở đây.</p>}
        </div>
    );
}
