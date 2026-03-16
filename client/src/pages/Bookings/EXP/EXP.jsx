/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./exp.module.scss";

export default function exp() {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPlays();
    }, []);

    const fetchPlays = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_BE_URL}/v1/api/play/getAll`,
            );
            setData(res.data);
        } catch (err) {
            console.error("Fetch play error", err);
        } finally {
            setLoading(false);
        }
    };

    const normalize = (str = "") =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const filtered = data.filter((item) => {
        const key = normalize(keyword);
        const name = normalize(item.name);
        const desc = normalize(item.description);
        const category = normalize(item.category);

        const matchKeyword = name.includes(key) || desc.includes(key);

        const matchType = type === "all" || category === normalize(type);

        return matchKeyword && matchType;
    });

    return (
        <div className={styles.container}>
            <h1>Trải nghiệm</h1>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <input
                    placeholder="Tìm tour, hoạt động..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="nature">Thiên nhiên</option>
                    <option value="culture">Văn hóa</option>
                    <option value="adventure">Mạo hiểm</option>
                    <option value="workshop">Workshop</option>
                </select>
            </div>

            {/* List */}
            {loading ? (
                <p>Đang tải...</p>
            ) : filtered.length === 0 ? (
                <p>Không có trải nghiệm.</p>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((item) => (
                        <div key={item._id} className={styles.card}>
                            <img src={item.image} alt="" />
                            <h3>{item.name}</h3>
                            <p className={styles.desc}>{item.description}</p>
                            <span>{item.price.toLocaleString()} đ</span>
                            <button>Đặt trải nghiệm</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
