import React, { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
    LayersControl,
} from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarker, FaDirections } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import {
    MapProvider,
    useMapContext,
} from "./components/contexts/useMapContext.jsx";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import MarkerClusterGroup from "react-leaflet-markercluster";
import axios from "axios";

import GetPlace from "./components/GetPlace/GetPlace";
import CreateForm from "./components/CreateForm/CreateForm";
import FlyToPlace from "./components/FlyToPlace/FlyToPlace.jsx";
import InforPlace from "./components/InforPlace/InforPlace.jsx";
import RouteLayer from "./components/RouteLayer/RouteLayer.jsx";
export function MapContent() {
    const { durDis } = useMapContext();

    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [popup, setPopup] = useState(false);

    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState("");

    const [territory, setTerritory] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [draw, setDraw] = useState(null);
    const [inFor, setInFor] = useState({});
    const [cate, setCate] = useState("All");
    const [unit, setUnit] = useState({ time: "h", distance: "km" });
    const [newData, setNewData] = useState({ distance: 0, duration: 0 });
    useEffect(() => {
        axios.get("/data.geojson").then((res) => setTerritory(res.data));
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
            .then((res) => setCoordinates(res.data))
            .catch((err) => console.log(err));
    }, []);

    const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <FaMapMarker className={styles.marker} />
        ),
        className: "",
        iconSize: [24, 24],
    });
    const categories = [
        "All",
        "Danh lam thắng cảnh",
        "Du lịch tâm linh",
        "Di tích lịch sử",
        "Biển đảo",
        "Lễ hội",
        "Chợ",
        "Sở thú",
        "Khu đô thị ",
        "Khu vui chơi - giải trí",
    ];

    useEffect(() => {
        if (!durDis) return;

        let distance = durDis.distance;
        let duration = durDis.duration;

        switch (unit.distance) {
            case "km":
                distance = (distance / 1000).toFixed(2);
                break;
            case "mi":
                distance = (distance / 1609.34).toFixed(2);
                break;
            case "m":
            default:
                distance = distance.toFixed(0);
                break;
        }

        switch (unit.time) {
            case "min":
                duration = (duration / 60).toFixed(0);
                break;
            case "h":
                duration = (duration / 3600).toFixed(1);
                break;
            case "s":
            default:
                duration = duration.toFixed(0);
                break;
        }

        setNewData({ distance, duration });
    }, [unit, durDis]);

    return (
        <div className={styles.container}>
            <div
                className={`${styles.roq} ${
                    show || add || popup ? styles.open : styles.closes
                }`}
            >
                <div className={styles.func}>
                    <button
                        className={styles.icon}
                        onClick={() => {
                            setAdd(false);
                            setPopup(false);
                            setShow(!show);
                        }}
                    >
                        <FaDirections />{" "}
                    </button>

                    <div className={styles.categories}>
                        {categories.map((value, id) => (
                            <div className={styles.category}>
                                <p
                                    onClick={() => setCate(value)}
                                    key={id}
                                    className={
                                        cate === value ? styles.cate : ""
                                    }
                                >
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.miniBox} ${
                    durDis?.distance && durDis?.duration
                        ? styles.open1
                        : styles.close1
                }`}
            >
                <div className={styles.step1}>
                    <div className={styles.distance}>
                        <button
                            className={unit.distance === "m" && styles.acStep}
                            onClick={() =>
                                setUnit({ time: unit.time, distance: "m" })
                            }
                        >
                            mét (m)
                        </button>
                        <button
                            className={unit.distance === "km" && styles.acStep}
                            onClick={() =>
                                setUnit({ time: unit.time, distance: "km" })
                            }
                        >
                            km (km)
                        </button>
                        <button
                            className={unit.distance === "mi" && styles.acStep}
                            onClick={() =>
                                setUnit({ time: unit.time, distance: "mi" })
                            }
                        >
                            dặm (mi)
                        </button>
                    </div>
                    <div className={styles.duration}>
                        <button
                            className={unit.time === "s" && styles.acStep}
                            onClick={() =>
                                setUnit({
                                    time: "s",
                                    distance: unit.distance,
                                })
                            }
                        >
                            giây (s)
                        </button>
                        <button
                            className={unit.time === "min" && styles.acStep}
                            onClick={() =>
                                setUnit({
                                    time: "min",
                                    distance: unit.distance,
                                })
                            }
                        >
                            phút (min)
                        </button>
                        <button
                            className={unit.time === "h" && styles.acStep}
                            onClick={() =>
                                setUnit({
                                    time: "h",
                                    distance: unit.distance,
                                })
                            }
                        >
                            Giờ (h)
                        </button>
                    </div>
                </div>
                <div className={styles.step2}>
                    <div className={styles.content1}>
                        <div className={styles.main}>
                            <h3>Khoảng cách</h3>{" "}
                            <p>
                                {newData?.distance} ({unit.distance})
                            </p>
                        </div>
                    </div>
                    <div className={styles.content}>
                        {" "}
                        <h3>Thời gian trung bình</h3>{" "}
                        <p>
                            {newData?.duration} ({unit.time})
                        </p>
                    </div>
                </div>
            </div>
            <GetPlace setDraw={setDraw} setShows={setShow} shows={show} />
            <InforPlace
                center={{ lat: inFor.lat, lng: inFor.lng }}
                popup={popup}
                inFor={inFor}
                setPopup={setPopup}
                setDraw={setDraw}
                setShows={setShow}
                shows={show}
            />
            <CreateForm
                setShow={setAdd}
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
            <MapContainer
                center={[10.173, 104.237]}
                zoom={9}
                minZoom={9}
                className={styles.map}
                zoomControl={false}
                doubleClickZoom={false}
            >
                <ZoomControl position="topright" />
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Light">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Carto Dark">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Esri World Imagery">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="Tiles &copy; Esri"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {/* Lớp ranh giới */}
                {territory && (
                    <GeoJSON
                        data={territory}
                        style={() => ({
                            fillColor: "#00cc66",
                            weight: 1.5,
                            opacity: 0.9,
                            color: "#007BFF",
                            fillOpacity: 0.2,
                        })}
                    />
                )}

                {/* Các Marker GPS */}
                {coordinates?.length > 0 && (
                    <MarkerClusterGroup chunkedLoading>
                        {coordinates.map((value, index) => {
                            const show =
                                cate === "All" || value.category.includes(cate);
                            if (!show) return null;
                            return (
                                typeof value.lat === "number" &&
                                typeof value.lng === "number" && (
                                    <Marker
                                        key={index}
                                        position={[value.lat, value.lng]}
                                        icon={customIcon}
                                        eventHandlers={{
                                            click: () => {
                                                setInFor(value);
                                                setPopup(true);
                                                setShow(false);

                                                setAdd(false);
                                            },
                                        }}
                                    />
                                )
                            );
                        })}
                    </MarkerClusterGroup>
                )}

                {/* Marker chọn khi thêm */}
                {center.lat && center.lng && (
                    <>
                        <Marker
                            position={[center.lat, center.lng]}
                            icon={customIcon}
                        />
                        <FlyToPlace center={center} />
                    </>
                )}

                {/* Vẽ tuyến đường từ API */}
                {draw?.features && <RouteLayer draw={draw} />}
            </MapContainer>
            <button
                className={styles.but}
                onClick={() => {
                    setAdd(!add);
                    setPopup(false);
                    setShow(false);
                }}
            >
                <IoIosAddCircle />
            </button>
        </div>
    );
}
export default function Map() {
    return (
        <MapProvider>
            <MapContent />
        </MapProvider>
    );
}
