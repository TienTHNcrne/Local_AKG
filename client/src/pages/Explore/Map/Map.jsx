import React, { use, useEffect, useState } from "react";
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

import { IoIosAddCircle } from "react-icons/io";
export default function Map() {
    const [add, setAdd] = useState(true);
    const [suggest, setSuggest] = useState([]);
    const [content, setContent] = useState(false);
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [search, setSearch] = useState("");
    const [popup, setPopup] = useState(false);
    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setData(res.data);
        });
        axios.get("/coordinates.json").then((res) => {
            setCoordinates(res.data);
        });
    }, []);
    //CALL BE

    useEffect(() => {
        const findata = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_BE_URL
                    }/v1/api/find?q=${encodeURIComponent(search)}`
                );
                console.log(res);
                setSuggest(res.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        findata();
    }, [search]);
    return (
        <div className={styles.container}>
            {" "}
            {add && (
                <div className={styles.add}>
                    <label htmlFor="name">Tên địa điểm</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {suggest && (
                        <div className={styles.suggest}>
                            {suggest.map((value, id) => console.log(value))}
                        </div>
                    )}
                    <label htmlFor="description">Mô tả</label>
                    <textarea name="description" required></textarea>

                    <label htmlFor="category">Phân loại</label>
                    <select name="category">
                        <option value="danh-lam">Danh lam thắng cảnh</option>
                        <option value="di-tich">Di tích lịch sử</option>
                        <option value="le-hoi">Lễ hội</option>
                    </select>

                    <label htmlFor="image">Hình ảnh</label>
                    <UpImg />
                    <button type="submit">Thêm địa danh</button>
                </div>
            )}
            {popup && <div className={styles.infor}>sdfsdf</div>}
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
                        })}
                    />
                )}
                {coordinates &&
                    coordinates.map((value) => (
                        <Marker
                            position={[value.lat, value.lng]}
                            eventHandlers={{
                                click: () => {
                                    setPopup(true);
                                },
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
            {/*ADDITIONAL */}
        </div>
    );
}
