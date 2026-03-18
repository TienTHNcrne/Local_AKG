import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MapMarker.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GetLocation from "../GetLocation.jsx";
import PickLocation from "../PickLocation.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapMarker = React.memo(function MapMarker({ pos, onPosChange }) {
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setMapData(res.data);
        });
    }, []);
    return (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={7}
            maxZoom={18}
            className={styles.leafletMap}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OSM"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Carto Light">
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution="&copy; CARTO"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            {mapData && (
                <GeoJSON
                    style={{ weight: 1.5, color: "#16a34a", fillOpacity: 0.07 }}
                />
            )}

            <GetLocation setPos={onPosChange} />

            <PickLocation setPosition={onPosChange} />

            {pos && <Marker position={pos} />}
        </MapContainer>
    );
});

export default MapMarker;
