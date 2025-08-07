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
import CreateForm from "./components/CreateForm/CreateForm";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";
import { IoIosAddCircle } from "react-icons/io";
import FlyToPlace from "./components/FlyToPlace/FlyToPlace";
export default function Map() {
    const [add, setAdd] = useState(true);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState("");
    const [content, setContent] = useState(false);
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [popup, setPopup] = useState(false);
    const [place, setPlace] = useState(false);

    useEffect(() => {
        axios.get("/data.geojson").then((res) => setData(res.data));
    }, []);
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
            .then((res) => setCoordinates(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={styles.container}>
            <CreateForm
                add={add}
                center={center}
                setCenter={setCenter}
                search={search}
                setSearch={setSearch}
                AddNewLocal={() => {
                    axios
                        .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
                        .then((res) => setCoordinates(res.data))
                        .catch((err) => console.log(err));
                }}
            />

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
                    ))}{" "}
                {center.lat !== null && center.lng !== null && (
                    <div>
                        <Marker position={[center.lat, center.lng]} />{" "}
                        <FlyToPlace center={center} />
                    </div>
                )}
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
