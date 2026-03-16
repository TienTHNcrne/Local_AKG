import React, { useState, useMemo } from "react";
import styles from "./Stays.module.scss";
import { InputNumber, Slider, Space, Rate, Input, Calendar } from "antd";
import { data } from "../Data/data";
import ToolBar from "./components/toolbar/toolbar";

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

    return Array.from({ length: count }, (_, i) => ({
        _id: `fake-${i}`,
        name: names[i % names.length] + " " + (i + 1),
        address: addresses[i % addresses.length],
        price: [250000, 450000, 650000, 850000, 1200000, 2000000][i % 6],
        image: new URL("/Rectangle 12.png", import.meta.url).href,
        rating: (3.5 + (i % 15) / 10).toFixed(1),
        amenities: amenitiesList.slice(0, (i % 4) + 2),
        capacity: Math.floor(Math.random() * 4) + 2,
        type: ["Khách sạn", "Homestay", "Resort", "Căn hộ"][i % 4],
    }));
};

export default function Stays() {
    const { ListProvinces, SortBy } = data();

    const fakeData = generateFakeStays(20);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Khám phá nơi lưu trú</h1>
                <p>
                    Tìm kiếm và đặt phòng khách sạn, resort, homestay phù hợp
                    với bạn
                </p>
            </div>
            <div className={styles.body}>
                <ToolBar ListProvinces={ListProvinces} SortBy={SortBy} />
                <div className={styles.cards}>
                    {fakeData.map((e, id) => (
                        //Card
                        <div className={styles.card} key={id}>
                            <img src={e.image} alt="" />
                            <div className={styles.content}>
                                <div className={styles.heroSection}>
                                    <h3>{e.name}</h3>
                                    <p>{e.address}</p>
                                    {/* amenities */}
                                    <div className={styles.amenities}>
                                        {e.amenities
                                            .slice(0, 3)
                                            .map((amenity, idx) => (
                                                <span
                                                    key={idx}
                                                    className={styles.amenity}
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        {e.amenities.length > 3 && (
                                            <span className={styles.amenity}>
                                                +{e.amenities.length - 3}
                                            </span>
                                        )}{" "}
                                    </div>
                                </div>
                                <div className={styles.ratingType}>
                                    <div className={styles.rate}>
                                        <Rate
                                            defaultValue={e.rating}
                                            disabled
                                        />
                                        <span>{e.rating}</span>
                                    </div>
                                    <div className={styles.type}>
                                        <span>{e.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <p>
                                    <strong>{e.price.toLocaleString()}₫</strong>{" "}
                                    / đêm
                                </p>
                                <button>Đặt ngay</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
