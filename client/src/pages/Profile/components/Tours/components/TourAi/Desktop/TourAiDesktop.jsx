/** @format */
import React, { useState, useEffect } from "react";
import styles from "./TourAiDesktop.module.scss";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    ZoomControl,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import clsx from "clsx";
import axios from "axios";

import ReqCreatingTour from "./components/ReqCreatingTour/ReqCreatingTour";
import SelectPlaces from "./components/SelectPlaces/SelectPlaces";
import BoxChat from "./components/BoxChat/BoxChat";

import GetLocation from "./LeafletFunction/GetLocation";
import PickLocation from "./LeafletFunction/PickLocation";
import TourProvide, { useTour } from "./Contexts/useTour";
export function Action({ setHide }) {
    const { setStartPlace, setStartPos } = useTour();
    const [closePlace, setClosePlace] = useState(true);
    const [data, setData] = useState(null);
    const [pos, setPos] = useState(null);
    const { loading } = useTour();
    useEffect(() => {
        axios.get("/data.geojson").then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        if (!pos) return;
        try {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v1/api/TradePosToAdd`, {
                    lat: pos.lat,
                    lng: pos.lng,
                })
                .then((res) => {
                    // console.log(res.data);
                    setStartPlace(res.data.display_name);

                    setStartPos({
                        lat: res.data.lat,
                        lng: res.data.lon,
                    });
                });
        } catch (err) {
            console.log(err.message);
        }
    }, [pos]);
    return (
        <div className={styles.container}>
            {" "}
            <button className={styles.close} onClick={() => setHide(false)}>
                {" "}
                &times;
            </button>
            <div className={styles.box}>
                {/* SIDEBAR */}
                <div
                    className={clsx(styles.c1, {
                        [styles.show]: !closePlace,
                    })}
                >
                    <SelectPlaces
                        setClosePlace={setClosePlace}
                        className={styles.col1}
                    />
                    <button
                        className={styles.closePlace}
                        onClick={() => setClosePlace(!closePlace)}
                    >
                        {closePlace ? ">" : "<"}
                    </button>
                </div>

                {/* MAIN AREA */}
                <div
                    className={clsx(styles.MiniBox, {
                        [styles.show1]: !closePlace,
                    })}
                >
                    {/* MAP */}
                    <div className={styles.map}>
                        <MapContainer
                            center={[10.173, 104.237]}
                            zoom={8}
                            minZoom={8}
                            className={styles.map}
                            whenCreated={(map) => (window.__MAP__ = map)}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OSM"
                            />

                            {data && <GeoJSON data={data} />}
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer name="MapTiler Streets">
                                    <TileLayer
                                        url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=WCKUTbdVx5gBcrVCqpsa"
                                        attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer
                                    checked
                                    name="OpenStreetMap"
                                >
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
                            <GetLocation setPos={setPos} />
                            <PickLocation setPosition={setPos} />
                            {pos && <Marker position={pos} />}
                        </MapContainer>
                    </div>

                    {/* ROW 2 */}
                    <div className={styles.row2}>
                        {loading && (
                            <div className={styles.loadingOverlay}>
                                <div className={styles.spinner}></div>
                            </div>
                        )}
                        <ReqCreatingTour className={styles.ro1} />
                        <BoxChat className={styles.ro2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TourAiDesktop({ setHide }) {
    return (
        <TourProvide>
            <Action setHide={setHide} />
        </TourProvide>
    );
}
