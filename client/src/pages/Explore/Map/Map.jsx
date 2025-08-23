/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarker } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import CreateForm from "./components/CreateForm/CreateForm";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";
import { IoIosAddCircle } from "react-icons/io";
import FlyToPlace from "./components/FlyToPlace/FlyToPlace";
import InforPlace from "./components/InforPlace/InforPlace";

export default function Map() {
    const [add, setAdd] = useState(false);
    const [center, setCenter] = useState({ lat: null, lng: null });
    const [search, setSearch] = useState("");
    const [territory, setTerritory] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [popup, setPopup] = useState(false);
    const [inFor, setInFor] = useState({});

    // Tải GeoJSON
    useEffect(() => {
        axios.get("/data.geojson").then((res) => setTerritory(res.data));
    }, []);

    // Tải tọa độ GPS
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
            .then((res) => setCoordinates(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Tạo icon React cho Marker
    const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <FaMapMarker className={styles.marker} />
        ),
        className: "",
        iconSize: [24, 24],
    });

    return (
        <div className={styles.container}>
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
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri"
                />
                {territory && (
                    <GeoJSON
                        data={territory}
                        style={() => ({
                            fillColor: "#00cc66",
                            weight: 1,
                        })}
                    />
                )}
                {coordinates?.length > 0 &&
                    coordinates.map((value, index) =>
                        typeof value.lat === "number" &&
                        typeof value.lng === "number" ? (
                            <Marker
                                key={index}
                                position={[value.lat, value.lng]}
                                icon={customIcon}
                                eventHandlers={{
                                    click: () => {
                                        setInFor(value);
                                        setPopup(true);
                                        setAdd(false);
                                    },
                                }}
                            />
                        ) : null
                    )}
                {center.lat && center.lng && (
                    <>
                        <Marker
                            position={[center.lat, center.lng]}
                            icon={customIcon}
                        />
                        <FlyToPlace center={center} />
                    </>
                )}
            </MapContainer>
            <button
                className={styles.but}
                onClick={() => {
                    setAdd(!add);
                    setPopup(false);
                }}
            >
                <IoIosAddCircle />
            </button>
        </div>
    );
}
