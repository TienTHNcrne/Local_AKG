/** @format */
import React, { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
    LayersControl,
    Polyline, // thêm vào
} from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarker } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import GetPlace from "./components/GetPlace/GetPlace";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CreateForm from "./components/CreateForm/CreateForm";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";
import { IoIosAddCircle } from "react-icons/io";
import FlyToPlace from "./components/FlyToPlace/FlyToPlace.jsx";
import InforPlace from "./components/InforPlace/InforPlace.jsx";
import RouteLayer from "./components/RouteLayer/RouteLayer.jsx";
import { FaDirections } from "react-icons/fa";
export default function Map() {
    const [add, setAdd] = useState(false);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState("");
    const [territory, setTerritory] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [popup, setPopup] = useState(false);
    const [inFor, setInFor] = useState({});
    const [draw, setDraw] = useState(null);
    const [show, setShow] = useState(false);
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
    const [cate, setCate] = useState("All");
    console.log(cate);
    return (
        <div className={styles.container}>
            <div
                className={`${styles.func} ${
                    show || add || popup ? styles.open : styles.closes
                }`}
            >
                <button className={styles.icon}>
                    <FaDirections
                        onClick={() => {
                            setAdd(false);
                            setPopup(false);
                            setShow(true);
                        }}
                    />{" "}
                </button>

                <div className={styles.categories}>
                    {categories.map((value, id) => (
                        <div className={styles.category}>
                            <p
                                onClick={() => setCate(value)}
                                key={id}
                                className={cate === value ? styles.cate : ""}
                            >
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <GetPlace setDraw={setDraw} setShows={setShow} shows={show} />

            <InforPlace
                center={{ lat: inFor.lat, lng: inFor.lng }}
                popup={popup}
                inFor={inFor}
                setPopup={setPopup}
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
