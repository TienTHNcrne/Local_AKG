/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TinhHoa.module.scss";
import Place from "./components/Place/Place.jsx";
import Festival from "./components/Festival/Festival.jsx";
import AddFes from "./components/Festival/components/AddFes/AddFes.jsx";
import AddFood from "./components/Food/components/AddFood/AddFood.jsx";
import Food from "./components/Food/Food.jsx";
export default function TinhHoa() {
    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState("All");
    const [form, setForm] = useState("place"); // tab hiện tại
    const [placeData, setPlaceData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [loadingPlace, setLoadingPlace] = useState(false);
    const [loadingEvent, setLoadingEvent] = useState(false);
    const [loadingFood, setLoadingFood] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const normalize = (str) => {
        if (typeof str !== "string") {
            console.log("oke", str);
            return "";
        }
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                setLoadingPlace(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/gps/all`
                );
                setPlaceData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch place:", err.message);
            } finally {
                setLoadingPlace(false);
            }
        };

        const fetchEvent = async () => {
            try {
                setLoadingEvent(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/festival/GetAll`
                );
                setEventData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch event:", err.message);
            } finally {
                setLoadingEvent(false);
            }
        };

        const fetchFood = async () => {
            try {
                setLoadingFood(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_BE_URL}/v1/api/food/GetAll`
                );
                setFoodData(res.data);
            } catch (err) {
                console.error("Lỗi khi fetch food:", err.message);
            } finally {
                setLoadingFood(false);
            }
        };

        if (form === "place" && placeData.length === 0) fetchPlace();
        if (form === "event" && eventData.length === 0) fetchEvent();
        if (form === "food" && foodData.length === 0) fetchFood();
    }, [form]);

    const currentData =
        form === "place"
            ? placeData
            : form === "event"
            ? eventData
            : form === "food"
            ? foodData
            : [];
    const filteredData = currentData.filter((item) => {
        const name = normalize(item.name);
        const desc = normalize(item.description);
        const categories = Array.isArray(item.category)
            ? item.category.map(normalize)
            : [normalize(item.category)];
        const key = normalize(keyword);

        const matchKeyword =
            name.includes(key) ||
            desc.includes(key) ||
            categories.some((cat) => cat.includes(key));

        const matchFilter =
            filter === "All" ||
            categories.some((cat) => cat === normalize(filter));

        return matchKeyword && matchFilter;
    });

    const loading =
        form === "place"
            ? loadingPlace
            : form === "event"
            ? loadingEvent
            : form === "food"
            ? loadingFood
            : false;
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
                                <option value="Biển đảo">Biển đảo</option>
                                <option value="Lễ hội"> Lễ hội</option>
                                <option value="Sở thú">Sở thú</option>
                                <option value="Khu vui chơi - giải trí">
                                    Khu vui chơi - giải trí
                                </option>
                                <option value="Khu đô thị">Khu đô thị</option>{" "}
                                <option value="Chợ">Chợ</option>
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
                <Food filteredData={filteredData} />
            ) : form === "event" ? (
                <Festival filteredData={filteredData} />
            ) : null}

            {showAdd && form === "event" && <AddFes setShow={setShowAdd} />}
            {showAdd && form === "food" && <AddFood setShow={setShowAdd} />}
        </div>
    );
}
