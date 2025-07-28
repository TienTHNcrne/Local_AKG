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
import { IoIosAddCircle } from "react-icons/io";
export default function Map() {
    const [data, setData] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [popup, setPopup] = useState(false);
    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setData(res.data);
        });
        axios.get("/coordinates.json").then((res) => {
            setCoordinates(res.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            {popup && <div className={styles.infor}>sdfsdf</div>}
            <MapContainer
                center={[10.173, 104.237]}
                zoom={8}
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
            <div className={styles.add}>
                <button>
                    <Link to="/add">
                        <IoIosAddCircle />
                    </Link>
                </button>
            </div>
        </div>
    );
}
