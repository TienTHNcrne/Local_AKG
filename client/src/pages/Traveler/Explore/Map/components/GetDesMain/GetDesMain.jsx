/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import styles from "./GetDesMain.module.scss";
import { IoSparklesSharp } from "react-icons/io5";
import Rate from "../InforPlace/components/Comments/Rate/Rate";

export default function GetDesMain({
    category,
    address,
    general,
    name,
    time,
    lat,
    lng,
    images,
    setPopup,
}) {
    const [showReview, setShowReview] = useState(false);
    const [lovePlace, setLovePlace] = useState(false);
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        if (!lat || !lng) return;
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/FindPlace`, {
                UserId: userId,
                lat: lat,
                lng: lng,
                name: `${name}, ${address}`,
            })
            .then((res) => {
                setLovePlace(res.data === "PlaceLove");
            })
            .catch((err) => console.log(err.message));
    }, [lat, lng]);

    // Thêm/xóa yêu thích
    const toggleLovePlace = () => {
        if (lovePlace) {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/remove`, {
                    UserId: userId,
                    lat,
                    lng,
                    name: `${name}, ${address}`,
                })
                .then(() => {
                    notification.success({
                        description: "Đã xoá khỏi yêu thích",
                    });
                    setLovePlace(false);
                })
                .catch((err) => console.log(err.message));
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_BE_URL}/v1/api/place/CreatePlace`,
                    {
                        img: images[0],
                        UserId: userId,
                        lat,
                        lng,
                        name: `${name}, ${address}`,
                    }
                )
                .then(() => {
                    notification.success({
                        description: "Đã thêm vào yêu thích",
                    });
                    setLovePlace(true);
                })
                .catch((err) => console.log(err.message));
        }
    };

    return (
        <div className={styles.container}>
            {/* Popup viết review */}
            {showReview && <Rate setShow={setShowReview} lat={lat} lng={lng} />}

            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <button onClick={() => setPopup(false)}>&times;</button>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {images.length > 0 && (
                        <img
                            src={
                                images[
                                    Math.floor(Math.random() * images.length)
                                ]
                            }
                            alt={name}
                        />
                    )}
                    <div className={styles.main}>
                        <div className={styles.mainContent}>
                            <h2>{name}</h2>
                            <div className={styles.categories}>
                                {category?.map((v, id) => (
                                    <p>{v}</p>
                                ))}
                            </div>{" "}
                        </div>

                        <div className={styles.mainContent}>
                            <h4>Tổng quan</h4>
                            <p>{general}</p>
                        </div>

                        <div className={styles.mainContent}>
                            <h4>Địa chỉ</h4>
                            <p>{address}</p>
                        </div>

                        <div className={styles.mainContent}>
                            <h4>Thời điểm thích hợp để du lịch</h4>
                            <p>{time}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <div className={styles.add}>
                        <button onClick={toggleLovePlace}>
                            <IoSparklesSharp
                                style={{
                                    color: lovePlace ? "#e91e63" : "#555",
                                }}
                            />
                        </button>
                        <p>
                            {lovePlace ? "Đã yêu thích" : "Thêm vào yêu thích"}
                        </p>
                    </div>
                    <button
                        className={styles.review}
                        onClick={() => setShowReview(true)}
                    >
                        Viết đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
}
