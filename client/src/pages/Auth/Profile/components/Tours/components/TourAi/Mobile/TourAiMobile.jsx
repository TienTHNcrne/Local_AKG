import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SelectPlace from "./components/SelectPlace/SelectPlace";
import { useTour } from "../Contexts/useTour";
import clsx from "clsx";
import styles from "./TourAiMobile.module.scss";
import GetLocation from "../LeafletFunction/GetLocation";
import PickLocation from "../LeafletFunction/PickLocation";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReqCreatingTourMobile from "./components/ReqCreatingTourMobile/ReqCreatingTourMobile";
import BoxChatMobile from "./components/BoxChatMobile/BoxChatMobile";
const MapView = React.memo(function MapView({
    data,
    pos,
    setPos,
    isFullscreen,
}) {
    const mapRef = useRef();

    return (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={8}
            className={styles.map}
            ref={mapRef}
            whenCreated={(map) => {
                mapRef.current = map;
            }}
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

export default function TourAiMobile({ setHide }) {
    const { setStartPlace, setStartPos, loading } = useTour();
    const [closePlace, setClosePlace] = useState(true);
    const [data, setData] = useState(null);
    const [pos, setPos] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [tab, setTab] = useState("Place");
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

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                setHide(false);
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [setHide]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className={styles.container}>
            <button
                className={styles.close}
                onClick={() => setHide(false)}
                aria-label="Đóng"
            >
                &times;
            </button>
            <div className={styles.tabs}>
                <button
                    className={clsx(
                        styles.tab,
                        tab === "Place" && styles.active,
                    )}
                    onClick={() => {
                        setTab("Place");
                    }}
                >
                    Chọn địa điểm
                </button>
                <button
                    className={clsx(
                        styles.tab,
                        tab === "Tour" && styles.active,
                    )}
                    onClick={() => {
                        setTab("Tour");
                    }}
                >
                    Tạo tour
                </button>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.map}>
                        <MapView
                            data={data}
                            pos={pos}
                            setPos={setPos}
                            isFullscreen={isFullscreen}
                        />
                        <button
                            className={styles.fullscreenBtn}
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            aria-label={
                                isFullscreen
                                    ? "Thoát toàn màn hình"
                                    : "Xem toàn màn hình"
                            }
                        >
                            {isFullscreen ? "↩️" : "↖️"}
                        </button>
                    </div>
                    {tab === "Place" ? (
                        <SelectPlace />
                    ) : (
                        <div>
                            {" "}
                            {loading && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner} />
                                </div>
                            )}
                            <ReqCreatingTourMobile />
                            <BoxChatMobile />
                        </div>
                    )}{" "}
                </div>
            </div>
        </div>
    );
}
