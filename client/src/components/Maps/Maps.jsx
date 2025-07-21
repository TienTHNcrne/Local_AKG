import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
export default function Maps({ className }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={8}
            className={className}
        >
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
        </MapContainer>
    );
}
