/** @format */

import React, { useEffect, useState } from "react";
import { RiMapPinFill } from "react-icons/ri";
import styles from "./General.module.scss";
import { FaHeart } from "react-icons/fa6";
import { MdGpsFixed } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { FaDirections } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../../../../../Contexts/Auth/Auth";
import { notification } from "antd";
import GetPlace from "../../../GetPlace/GetPlace";
import { useMapContext } from "../../../contexts/useMapContext";
export default function General({
    description,
    address,
    center,
    img,
    setShows,
    setPopup,
}) {
    const { setInFor } = useMapContext();
    const { userId } = useAuth();
    const [lovePlace, setLovePlace] = useState(false);
    const aress = address ? address.split(",") : [];
    let addres = "";
    for (var i = 1; i < aress.length - 1; ++i) {
        addres += aress[i].trim() + (i < aress.length - 2 ? "," : "");
    }

    useEffect(() => {
        if (!center) return;
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/FindPlace`, {
                UserId: userId,
                lat: center.lat,
                lng: center.lng,
                name: address,
            })
            .then((res) => {
                setLovePlace(false);
                if (res.data === "PlaceLove") {
                    setLovePlace(true);
                }
            })
            .catch((err) => console.log(err.message));
    }, [center]);
    const GetPlace = () => {
        if (!userId) {
            alert("Bạn chưa đăng nhập, Hãy đăng nhập để dùng chức năng này!");
            return;
        }
        if (lovePlace) {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/remove`, {
                    UserId: userId,
                    lat: center.lat,
                    lng: center.lng,
                    name: address,
                })
                .then(() => {
                    notification.success({ description: "Đã xoá" });
                    setLovePlace(false);
                })
                .catch((err) => console.log(err.message));
        } else {
            axios
                .post(
                    `${import.meta.env.VITE_BE_URL}/v1/api/place/CreatePlace`,
                    {
                        img: img,
                        UserId: userId,
                        lat: center.lat,
                        lng: center.lng,
                        name: address,
                    }
                )
                .then(() => {
                    setLovePlace(true);
                    notification.success({
                        description: "Đã thêm vào yêu thích",
                    });
                })
                .catch((err) => console.log(err.message));
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.option}>
                <FaDirections
                    onClick={() => {
                        setInFor({
                            name: address,
                            lng: center.lng,
                            lat: center.lat,
                        });
                        setShows(true);
                        setPopup(false);
                    }}
                />
                <button
                    onClick={GetPlace}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <FaHeart style={{ color: lovePlace ? "red" : "inherit" }} />
                </button>
            </div>
            <div className={styles.inFor}>
                <div className={styles.address}>
                    <h3>Địa chỉ</h3>
                    <p>{addres}</p>
                </div>
                <div className={styles.description}>
                    <h3>Thông tin cơ bản</h3>
                    <p>{description}</p>
                </div>{" "}
            </div>
        </div>
    );
}
