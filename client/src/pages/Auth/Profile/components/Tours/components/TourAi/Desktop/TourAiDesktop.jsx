/** @format */
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./TourAiDesktop.module.scss";
import clsx from "clsx";
import axios from "axios";
import debounce from "lodash.debounce";

import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import ReqCreatingTour from "./components/ReqCreatingTour/ReqCreatingTour.jsx";
import SelectPlaces from "./components/SelectPlaces/SelectPlaces.jsx";
import BoxChat from "./components/BoxChat/BoxChat.jsx";

import GetLocation from "../LeafletFunction/GetLocation.jsx";
import PickLocation from "../LeafletFunction/PickLocation.jsx";
import { useTour } from "../Contexts/useTour.jsx";

/* ================= MAP (memo để không re-render) ================= */
const MapView = React.memo(function MapView({ data, pos, setPos }) {
    return (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={8}
            className={styles.map}
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

            {data && <GeoJSON data={data} />}
            <GetLocation setPos={setPos} />
            <PickLocation setPosition={setPos} />
            {pos && <Marker position={pos} />}
        </MapContainer>
    );
});

/* ================= MAIN ================= */
export default function TourAiDesktop({ setHide }) {
    const { setStartPlace, setStartPos, loading } = useTour();

    const [closePlace, setClosePlace] = useState(true);
    const [data, setData] = useState(null);
    const [pos, setPos] = useState(null);

    /* ===== cache reverse geocode ===== */
    const geoCache = useRef(new Map());

    /* ===== debounce API ===== */
    const reverseGeocode = useMemo(
        () =>
            debounce(async (pos) => {
                const key = `${pos.lat.toFixed(5)}-${pos.lng.toFixed(5)}`;

                if (geoCache.current.has(key)) {
                    const cached = geoCache.current.get(key);
                    setStartPlace(cached.name);
                    setStartPos(cached.pos);
                    return;
                }

                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_BE_URL}/v1/api/TradePosToAdd`,
                        {
                            lat: pos.lat,
                            lng: pos.lng,
                        },
                    );
                    console.log(res);
                    const data = {
                        name: res.data.display_name,
                        pos: {
                            lat: res.data.lat,
                            lng: res.data.lon,
                        },
                    };

                    geoCache.current.set(key, data);
                    setStartPlace(data.name);
                    setStartPos(data.pos);
                } catch (err) {
                    console.error("Reverse geocode error", err);
                }
            }, 500),
        [setStartPlace, setStartPos],
    );

    /* ===== load geojson 1 lần ===== */
    useEffect(() => {
        let mounted = true;
        axios.get("/data.geojson").then((res) => {
            if (mounted) setData(res.data);
        });
        return () => (mounted = false);
    }, []);

    /* ===== gọi API khi pos ổn định ===== */
    useEffect(() => {
        if (!pos) return;
        reverseGeocode(pos);
    }, [pos, reverseGeocode]);

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={() => setHide(false)}>
                &times;
            </button>

            <div className={styles.box}>
                {/* SIDEBAR */}
                <div
                    className={clsx(styles.c1, {
                        [styles.show]: !closePlace,
                    })}
                >
                    <SelectPlaces setClosePlace={setClosePlace} />
                    <button
                        className={styles.closePlace}
                        onClick={() => setClosePlace(!closePlace)}
                    >
                        {closePlace ? ">" : "<"}
                    </button>
                </div>

                {/* MAIN */}
                <div
                    className={clsx(styles.MiniBox, {
                        [styles.show1]: !closePlace,
                    })}
                >
                    <div className={styles.map}>
                        <MapView data={data} pos={pos} setPos={setPos} />
                    </div>

                    <div className={styles.row2}>
                        {loading && (
                            <div className={styles.loadingOverlay}>
                                <div className={styles.spinner} />
                            </div>
                        )}
                        <ReqCreatingTour />
                        <BoxChat />
                    </div>
                </div>
            </div>
        </div>
    );
}
