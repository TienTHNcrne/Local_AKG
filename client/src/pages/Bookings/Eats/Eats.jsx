import React, { useEffect, useState } from "react";
import ToolBar from "./components/ToolBar/ToolBar";
import styles from "./Eats.module.scss";
import { data } from "../Data/data";
import { Rate } from "antd";
const fakeEats = [
    {
        id: 1,
        name: "Bánh mì Cô Ba",
        province: "Hồ Chí Minh",
        type: "Quick",
        rating: 4.6,
        distance: 0.4,
        price: 25000,
        image: "https://images.unsplash.com/photo-1604908812613-32c3c39e5b34?w=400",
        tags: ["bánh mì", "mang đi"],
    },
    {
        id: 2,
        name: "Phở Bát Đàn",
        province: "Hà Nội",
        type: "Quick",
        rating: 4.7,
        distance: 0.7,
        price: 45000,
        image: "https://images.unsplash.com/photo-1547928578-4b67c5f16f36?w=400",
        tags: ["phở", "nóng"],
    },
    {
        id: 3,
        name: "Bún bò Huế O Xuân",
        province: "Đà Nẵng",
        type: "Quick",
        rating: 4.5,
        distance: 0.5,
        price: 40000,
        image: "https://images.unsplash.com/photo-1625944230945-1b7dd2c6d66c?w=400",
        tags: ["bún", "đặc sản"],
    },

    {
        id: 4,
        name: "Nhà hàng Cung Đình",
        province: "Huế",
        type: "Expr",
        rating: 4.8,
        distance: 1.2,
        price: 250000,
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400",
        tags: ["cung đình", "truyền thống"],
    },
    {
        id: 5,
        name: "The Deck Saigon",
        province: "Hồ Chí Minh",
        type: "Expr",
        rating: 4.7,
        distance: 2.1,
        price: 350000,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
        tags: ["view sông", "fine dining"],
    },
    {
        id: 6,
        name: "Nhà hàng Gạo",
        province: "Hà Nội",
        type: "Quick",
        rating: 4.6,
        distance: 0.9,
        price: 220000,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
        tags: ["đặc sản việt", "truyền thống"],
    },
];
export default function Eats() {
    const { ListProvinces, SortBy } = data();
    const [filter, setFilter] = useState([]);
    const [styleFood, setStyleFood] = useState("Quick");
    const listStyleFood = [
        { key: "Quick", value: "Ăn nhanh" },
        { key: "Expr", value: "Ẩm thực trải nghiệm" },
    ];
    //     filter Eats
    useEffect(() => {
        return setFilter(fakeEats.filter((e) => e.type === styleFood));
    }, [styleFood]);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Ăn uống</h1>
                <p>description</p>
            </div>
            <ToolBar ListProvinces={ListProvinces} SortBy={SortBy} />
            <div className={styles.StyleFood}>
                {/* Select Style Food */}
                {listStyleFood.map((e, id) => (
                    <button
                        key={id}
                        onClick={() => setStyleFood(e.key)}
                        className={styleFood === e.key && styles.active}
                    >
                        {e.value}
                    </button>
                ))}
            </div>
            {/* List  */}
            <div className={styles.cards}>
                {filter.map((e) => (
                    <div key={e.id} className={styles.card}>
                        <div className={styles.Logo}>
                            <img src={e.image} alt={e.name} />
                            <p>{e.distance} km</p>
                        </div>
                        <div className={styles.Title}>
                            <h3>{e.name}</h3>
                            <p>{e.province}</p>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.ratePrice}>
                                <div className={styles.rating}>
                                    <Rate value={e.rating} disabled />
                                    <p>{e.rating}</p>
                                </div>
                                <p>{e.price.toLocaleString("vi-VN")} đ</p>
                            </div>
                            <button>Đặt ngay</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
