import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./Row3.module.scss";
import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    LayersControl,
} from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.DivIcon({
    className: "",
    html: `<div style="width:10px;height:10px;background:#2e7d52;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
});

export default function Row3() {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
            .then((res) => setCoordinates(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* GPS point count */}

            <MapContainer
                center={[10.173, 104.237]}
                zoom={9}
                minZoom={9}
                className={styles.map}
                zoomControl={false}
                doubleClickZoom={false}
                preferCanvas={true}
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
                            attribution="&copy; OSM &copy; CARTO"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Dark">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution="&copy; OSM &copy; CARTO"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Esri Satellite">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="Tiles &copy; Esri"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="MapTiler Streets">
                        <TileLayer
                            url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=WCKUTbdVx5gBcrVCqpsa"
                            attribution="&copy; MapTiler &copy; OSM"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {coordinates.map((point, i) => (
                    <Marker
                        key={i}
                        position={[
                            point.lat ?? point.latitude,
                            point.lng ?? point.longitude,
                        ]}
                        icon={markerIcon}
                    />
                ))}
            </MapContainer>
        </div>
    );
}
