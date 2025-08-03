import React, { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
} from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import UpImg from "../../../components/UpImg/UpImg";
import "@ant-design/v5-patch-for-react-19";
import { message, notification } from "antd";
import { IoIosAddCircle } from "react-icons/io";

export default function Map() {
    const [add, setAdd] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(false);
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [search, setSearch] = useState("");
    const [popup, setPopup] = useState(false);
    const [existed, setExisted] = useState(false);
    const [place, setPlace] = useState(false);

    useEffect(() => {
        axios.get("/data.geojson").then((res) => setData(res.data));
        axios.get("/coordinates.json").then((res) => setCoordinates(res.data));
    }, []);

    // Gợi ý địa điểm theo từ khóa
    useEffect(() => {
        if (!search) return;

        const time = setTimeout(() => {
            const fetchSuggestions = async () => {
                try {
                    const res = await axios.get(
                        `${
                            import.meta.env.VITE_BE_URL
                        }/v1/api/find?q=${encodeURIComponent(search)}`
                    );
                    setSuggest(res.data);
                } catch (err) {
                    console.error("Gợi ý thất bại:", err.message);
                }
            };
            fetchSuggestions();
        }, 400);

        return () => clearTimeout(time);
    }, [search]);

    // Kiểm tra trùng tọa độ
    useEffect(() => {
        if (!center.lat || !center.lng || !search) return;

        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/find`, {
                params: {
                    lat: center.lat,
                    lng: center.lng,
                    name: search,
                },
            })
            .then((res) => {
                if (res.data.name === "existed") setExisted(true);
            })
            .catch((err) => console.error("Lỗi kiểm tra toạ độ:", err));
    }, [center]);

    // Gửi thông tin địa điểm lên server
    const SubPlace = async () => {
        if (!center.lat || !center.lng || !search) return;
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BE_URL}/v1/api/gps`,
                {
                    params: {
                        lat: center.lat,
                        lng: center.lng,
                        name: search,
                    },
                }
            );
            console.log("Đã gửi:", res);
        } catch (err) {
            console.error("Gửi thất bại:", err.message);
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.add} ${add ? styles.open : styles.close}`}
            >
                <label htmlFor="name">Tên địa điểm</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {suggest?.length > 0 && (
                    <div className={styles.suggest}>
                        {suggest.map((value, id) => (
                            <div
                                className={styles.sug}
                                key={id}
                                onClick={() => {
                                    setSearch(value.name);
                                    setCenter({
                                        lat: value.lat,
                                        lng: value.lng,
                                    });
                                    setSuggest([]);
                                }}
                            >
                                {value.name}
                            </div>
                        ))}
                    </div>
                )}

                <label htmlFor="description">Mô tả</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="category">Phân loại</label>
                <select name="category">
                    <option value="danh-lam">Danh lam thắng cảnh</option>
                    <option value="di-tich">Di tích lịch sử</option>
                    <option value="le-hoi">Lễ hội</option>
                </select>

                <label htmlFor="image">Hình ảnh</label>
                <UpImg />

                <button type="submit" onClick={SubPlace}>
                    Thêm địa danh
                </button>
            </div>

            {popup && <div className={styles.infor}>Thông tin địa điểm</div>}

            <MapContainer
                center={[10.173, 104.237]}
                zoom={9}
                minZoom={9}
                className={styles.map}
                zoomControl={false}
                doubleClickZoom={false}
            >
                <ZoomControl position="topright" />
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data && (
                    <GeoJSON
                        data={data}
                        style={() => ({
                            fillColor: "#00cc66",
                            weight: 1,
                        })}
                    />
                )}
                {coordinates?.length > 0 &&
                    coordinates.map((value, index) => (
                        <Marker
                            key={index}
                            position={[value.lat, value.lng]}
                            eventHandlers={{
                                click: () => setPopup(true),
                            }}
                        />
                    ))}
            </MapContainer>

            <button
                className={styles.but}
                onClick={() => {
                    setAdd(!add);
                    setContent(false);
                }}
            >
                <IoIosAddCircle />
            </button>
        </div>
    );
}
