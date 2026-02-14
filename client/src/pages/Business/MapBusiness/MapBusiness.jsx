import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapBusiness.module.scss";

// Fix icon lỗi
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Dữ liệu demo
const places = [
    {
        name: "Núi Cấm",
        lat: 10.5546,
        lng: 105.0277,
        type: "Hot",
    },
    {
        name: "Châu Đốc",
        lat: 10.7021,
        lng: 105.1167,
        type: "City",
    },
    {
        name: "Long Xuyên",
        lat: 10.3864,
        lng: 105.4352,
        type: "City",
    },
];

export default function MapBusiness() {
    return (
        <div className={styles.container}>
            <h2>🗺 Bản đồ số AGiLand</h2>

            <MapContainer
                center={[10.5546, 105.0277]}
                zoom={9}
                className={styles.map}
            >
                <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {places.map((p, i) => (
                    <Marker key={i} position={[p.lat, p.lng]}>
                        <Popup>
                            <strong>{p.name}</strong> <br />
                            Loại: {p.type}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
