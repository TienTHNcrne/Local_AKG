/** @format */

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
export default function Maps({ className }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setData(res.data);
        });
    }, []);
    let saveLayer = null;
    const onEachFeature = (feature, layer) => {
        const p = feature.properties;
        const popupContent = `
        <div >
            <h4 > ${p.ten_xa}</h4>
            <div> 
                <div>
                    <p> <b>Diện tích:</b> ${p.dtich_km2} km²</p>                
                    <p> <b>Dân số:</b> ${p.dan_so} km²</p>

                </div>
            </div>
        </div>`;
        layer.setStyle({
            fillColor: "#00cc66",
            color: "#60ABE6",
        });
        layer.on("click", function () {
            if (saveLayer && layer !== saveLayer) {
                saveLayer.setStyle({
                    fillColor: "#00cc66",
                    color: "#60ABE6",
                });
            }
            layer.setStyle({
                fillColor: "#ff0000ff",
                color: "#c60000ff",
            });
            saveLayer = layer;
        });
        layer.bindPopup(popupContent);
    };

    console.log(data);
    return (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={8}
            className={className}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            />
            <Popup position={[10.383981819241987, 105.44369101154382]}>
                Long Xuyên
            </Popup>
            {data && (
                <GeoJSON
                    data={data}
                    style={() => ({})}
                    onEachFeature={onEachFeature}
                />
            )}
        </MapContainer>
    );
}
