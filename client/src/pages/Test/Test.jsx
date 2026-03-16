import React, { useState } from "react";
import styles from "./Test.module.scss";
import { Slider, Rate, Input, Select, Checkbox, Button } from "antd";
import {
    SearchOutlined,
    EnvironmentOutlined,
    FilterOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const generateFakeStays = (count = 12) => {
    const names = [
        "Khách sạn Biển Xanh",
        "Homestay Sapa",
        "Resort Cát Bà",
        "Villa Đà Lạt",
        "The Hideout",
        "Sunrise Beach Hotel",
        "Mountain Retreat",
        "City Central Apartment",
    ];
    const addresses = [
        "Số 1, đường Hạ Long, Đà Nẵng",
        "Thôn Cát Cát, Sapa",
        "Bãi tắm Cát Cò, Cát Bà",
        "Đường Hồ Tùng Mậu, Đà Lạt",
        "Phố cổ Hội An",
        "Bãi sau, Vũng Tàu",
        "Ninh Bình",
        "Quận 1, TP.HCM",
    ];
    const amenitiesList = [
        "Wifi miễn phí",
        "Bể bơi",
        "Điều hòa",
        "Bữa sáng",
        "Xe đưa đón",
        "Gần biển",
    ];
    const images = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500",
    ];

    return Array.from({ length: count }, (_, i) => ({
        _id: `fake-${i}`,
        name: names[i % names.length] + " " + (i + 1),
        address: addresses[i % addresses.length],
        price: [250000, 450000, 650000, 850000, 1200000, 2000000][i % 6],
        image: images[i % images.length],
        rating: 3.5 + (i % 15) / 10,
        reviewCount: Math.floor(Math.random() * 200) + 50,
        amenities: amenitiesList.slice(0, (i % 4) + 2),
        capacity: Math.floor(Math.random() * 4) + 2,
        type: ["Khách sạn", "Homestay", "Resort", "Căn hộ"][i % 4],
        isPetFriendly: i % 3 === 0,
        isAvailable: true,
    }));
};

export default function Test() {
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortBy, setSortBy] = useState("price_desc");
    const [searchTerm, setSearchTerm] = useState("");

    const fakeData = generateFakeStays(20);

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type],
        );
    };

    const filteredData = fakeData
        .filter(
            (item) =>
                item.price >= priceRange[0] &&
                item.price <= priceRange[1] &&
                (selectedTypes.length === 0 ||
                    selectedTypes.includes(item.type)) &&
                (searchTerm === "" ||
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "rating_desc":
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Khám phá nơi lưu trú</h1>
                <p>
                    Tìm kiếm và đặt phòng khách sạn, resort, homestay phù hợp
                    với bạn
                </p>
            </div>

            <div className={styles.searchSection}>
                <Search
                    placeholder="Tìm kiếm khách sạn..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.toolbar}>
                <div className={styles.filterSection}>
                    <div className={styles.filterItem}>
                        <label>Khoảng giá</label>
                        <Slider
                            range
                            min={0}
                            max={5000000}
                            step={100000}
                            value={priceRange}
                            onChange={setPriceRange}
                            tipFormatter={(value) =>
                                `${value.toLocaleString()}₫`
                            }
                        />
                        <div className={styles.priceDisplay}>
                            <span>{priceRange[0].toLocaleString()}₫</span>
                            <span> - </span>
                            <span>{priceRange[1].toLocaleString()}₫</span>
                        </div>
                    </div>

                    <div className={styles.filterItem}>
                        <label>Sắp xếp theo</label>
                        <Select
                            value={sortBy}
                            onChange={setSortBy}
                            className={styles.sortSelect}
                        >
                            <Option value="price_desc">Giá cao đến thấp</Option>
                            <Option value="price_asc">Giá thấp đến cao</Option>
                            <Option value="rating_desc">
                                Đánh giá cao nhất
                            </Option>
                        </Select>
                    </div>
                </div>

                <div className={styles.options}>
                    <div className={styles.optionGroup}>
                        <Checkbox
                            checked={selectedTypes.includes("Khách sạn")}
                            onChange={() => handleTypeChange("Khách sạn")}
                        >
                            Khách sạn
                        </Checkbox>
                        <Checkbox
                            checked={selectedTypes.includes("Homestay")}
                            onChange={() => handleTypeChange("Homestay")}
                        >
                            Homestay
                        </Checkbox>
                        <Checkbox
                            checked={selectedTypes.includes("Resort")}
                            onChange={() => handleTypeChange("Resort")}
                        >
                            Resort
                        </Checkbox>
                        <Checkbox
                            checked={selectedTypes.includes("Căn hộ")}
                            onChange={() => handleTypeChange("Căn hộ")}
                        >
                            Căn hộ
                        </Checkbox>
                    </div>
                    <div className={styles.optionGroup}>
                        <Checkbox>Thu cưng</Checkbox>
                        <Checkbox>Bể bơi</Checkbox>
                        <Checkbox>Bãi đỗ xe</Checkbox>
                    </div>
                </div>
            </div>

            <div className={styles.resultsInfo}>
                <span className={styles.resultCount}>
                    Tìm thấy {filteredData.length} nơi lưu trú
                </span>
            </div>

            <div className={styles.cards}>
                {filteredData.map((item, id) => (
                    <div className={styles.card} key={id}>
                        <div className={styles.cardImage}>
                            <img src={item.image} alt={item.name} />
                            {item.isPetFriendly && (
                                <span className={styles.petBadge}>
                                    🐾 Pet friendly
                                </span>
                            )}
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <h3>{item.name}</h3>
                                <div className={styles.location}>
                                    <EnvironmentOutlined />
                                    <span>{item.address}</span>
                                </div>
                            </div>

                            <div className={styles.amenities}>
                                {item.amenities
                                    .slice(0, 3)
                                    .map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className={styles.amenityTag}
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                {item.amenities.length > 3 && (
                                    <span className={styles.amenityTag}>
                                        +{item.amenities.length - 3}
                                    </span>
                                )}
                            </div>

                            <div className={styles.ratingType}>
                                <Rate
                                    disabled
                                    defaultValue={item.rating}
                                    allowHalf
                                />
                                <span className={styles.reviewCount}>
                                    ({item.reviewCount} đánh giá)
                                </span>
                                <span className={styles.type}>{item.type}</span>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.price}>
                                    <strong>
                                        {item.price.toLocaleString()}₫
                                    </strong>
                                    <span>/đêm</span>
                                </div>
                                <Button
                                    type="primary"
                                    className={styles.bookButton}
                                >
                                    Đặt ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
