/** @format */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TinhHoa.module.scss";
import Place from "./components/Place/Place.jsx";
import Festival from "./components/Festival/Festival.jsx";
import AddFes from "./components/Festival/components/AddFes/AddFes.jsx";
import AddFood from "./components/Food/components/AddFood/AddFood.jsx";
import Food from "./components/Food/Food.jsx";

const API_ENDPOINTS = {
    place: `${import.meta.env.VITE_BE_URL}/v1/api/gps/all`,
    event: `${import.meta.env.VITE_BE_URL}/v1/api/festival/GetAll`,
    food: `${import.meta.env.VITE_BE_URL}/v1/api/food/GetAll`,
};

const TAB_CONFIG = {
    place: { label: "Địa điểm", component: Place },
    food: { label: "Món ăn", component: Food },
    event: { label: "Lễ hội", component: Festival },
};

export default function TinhHoa() {
    const navigate = useNavigate();
    const { tab } = useParams();

    // State management
    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState("All");
    const [currentTab, setCurrentTab] = useState(tab || "place");
    const [showAdd, setShowAdd] = useState(false);

    const [data, setData] = useState({
        place: [],
        event: [],
        food: [],
    });

    const [loading, setLoading] = useState({
        place: false,
        event: false,
        food: false,
    });

    // Update tab when URL changes
    useEffect(() => {
        if (tab) setCurrentTab(tab);
    }, [tab]);

    // Normalize text for search/filter
    const normalize = (str) => {
        if (typeof str !== "string") return "";
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    // Fetch data from API
    const fetchData = async (tabType) => {
        if (data[tabType].length > 0) return;

        try {
            setLoading((prev) => ({ ...prev, [tabType]: true }));
            const res = await axios.get(API_ENDPOINTS[tabType]);
            setData((prev) => ({ ...prev, [tabType]: res.data }));
        } catch (err) {
            console.error(`Error fetching ${tabType} data:`, err.message);
        } finally {
            setLoading((prev) => ({ ...prev, [tabType]: false }));
        }
    };

    // Fetch data when tab changes
    useEffect(() => {
        fetchData(currentTab);
    }, [currentTab]);

    // Get current data based on active tab
    const currentData = data[currentTab] || [];

    // Filter data based on keyword and category
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

    const handleTabChange = (t) => navigate(`/Explore/TinhHoa/${t}`);

    const CurrentComponent = TAB_CONFIG[currentTab]?.component || Place;
    const isLoading = loading[currentTab];

    return (
        <div className={styles.container}>
            {/* Tab Navigation */}
            <div className={styles.tabs}>
                {Object.entries(TAB_CONFIG).map(([key, { label }]) => (
                    <button
                        key={key}
                        className={currentTab === key ? styles.active : ""}
                        onClick={() => handleTabChange(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Search and Filter Section */}
            <div className={styles.header}>
                <div className={styles.second}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {currentTab === "place" && (
                        <FilterSelect
                            filter={filter}
                            onFilterChange={setFilter}
                        />
                    )}
                    {(currentTab === "event" || currentTab === "food") && (
                        <button onClick={() => setShowAdd(true)}>
                            Thêm dữ liệu
                        </button>
                    )}
                </div>
            </div>

            {/* Content Section */}
            {isLoading ? (
                <p className={styles.loading}>Đang tải dữ liệu...</p>
            ) : filteredData.length === 0 ? (
                <p className={styles.empty}>Không có dữ liệu.</p>
            ) : (
                <CurrentComponent filteredData={filteredData} />
            )}

            {/* Add Data Modals */}
            {showAdd && currentTab === "event" && (
                <AddFes setShow={setShowAdd} />
            )}
            {showAdd && currentTab === "food" && (
                <AddFood setShow={setShowAdd} />
            )}
        </div>
    );
}

// Filter Component
function FilterSelect({ filter, onFilterChange }) {
    const filterOptions = [
        "All",
        "Di tích lịch sử",
        "Du lịch tâm linh",
        "Danh lam thắng cảnh",
        "Biển đảo",
        "Lễ hội",
        "Sở thú",
        "Khu vui chơi - giải trí",
        "Khu đô thị",
        "Chợ",
    ];

    return (
        <div className={styles.filter}>
            <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                {filterOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
