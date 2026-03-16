/** @format */
import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import styles from "./TourAiDesktop.module.scss";
import clsx from "clsx";
import axios from "axios";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";

import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import ReqCreatingTour from "./components/ReqCreatingTour/ReqCreatingTour.jsx";
import SelectPlaces from "./components/SelectPlaces/SelectPlaces.jsx";
import BoxChat from "./components/BoxChat/BoxChat.jsx";
import HistoricTour from "./components/TourHistory/TourHistory.jsx";
import GetLocation from "../LeafletFunction/GetLocation.jsx";
import PickLocation from "../LeafletFunction/PickLocation.jsx";
import { useTour } from "../Contexts/useTour.jsx";

/* ── fix default icon ── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TABS = [
    { key: "suggest", label: "Dựng hành trình", path: "/ai/suggest" },
    {
        key: "historic-tour",
        label: "Lịch sử hành trình",
        path: "/ai/historic-tour",
    },
];

/* ── GeoJSON ── */
const GeoLayer = React.memo(({ data }) => {
    if (!data) return null;
    return (
        <GeoJSON
            key="geo"
            data={data}
            style={{ weight: 1.5, color: "#16a34a", fillOpacity: 0.07 }}
        />
    );
});

/* ── Marker ── */
const PosMarker = React.memo(({ pos }) =>
    pos ? <Marker position={pos} /> : null,
);

/* ── Map ── */
const MapWithMarker = React.memo(
    ({ data, pos, onPosChange }) => (
        <MapContainer
            center={[10.173, 104.237]}
            zoom={8}
            minZoom={7}
            maxZoom={18}
            className={styles.leafletMap}
            fadeAnimation={false}
            keepBuffer={4}
            preferCanvas={true}
            renderer={L.canvas({ tolerance: 5 })}
            inertia={true}
            inertiaDeceleration={2000}
            inertiaMaxSpeed={1500}
            zoomAnimation={true}
            zoomAnimationThreshold={4}
            wheelPxPerZoomLevel={80}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OSM"
                        maxNativeZoom={19}
                        maxZoom={22}
                        keepBuffer={4}
                        updateInterval={200}
                        updateWhenIdle={false}
                        updateWhenZooming={false}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Carto Light">
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution="&copy; CARTO"
                        maxNativeZoom={19}
                        maxZoom={22}
                        keepBuffer={4}
                        updateInterval={200}
                        updateWhenIdle={false}
                        updateWhenZooming={false}
                    />
                </LayersControl.BaseLayer>
            </LayersControl>

            <GeoLayer data={data} />
            <GetLocation setPos={onPosChange} />
            <PickLocation setPosition={onPosChange} />
            <PosMarker pos={pos} />
        </MapContainer>
    ),
    (p, n) =>
        p.data === n.data &&
        p.pos?.lat === n.pos?.lat &&
        p.pos?.lng === n.pos?.lng,
);

/* ================= PAGE ================= */
export default function TourAiDesktop() {
    const { setStartPlace, setStartPos, loading } = useTour();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Xác định tab active từ URL
    const activeTab =
        TABS.find((t) => pathname.startsWith(t.path))?.key ?? "suggest";

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [data, setData] = useState(null);
    const [pos, setPos] = useState(null);
    const geoCache = useRef(new Map());

    const handlePos = useCallback((p) => setPos(p), []);
    const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

    const reverseGeocode = useMemo(
        () =>
            debounce(async (p) => {
                const key = `${p.lat.toFixed(5)}-${p.lng.toFixed(5)}`;
                if (geoCache.current.has(key)) {
                    const c = geoCache.current.get(key);
                    setStartPlace(c.name);
                    setStartPos(c.pos);
                    return;
                }
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_BE_URL}/v1/api/TradePosToAdd`,
                        { lat: p.lat, lng: p.lng },
                    );
                    const d = {
                        name: res.data.display_name,
                        pos: { lat: res.data.lat, lng: res.data.lon },
                    };
                    geoCache.current.set(key, d);
                    setStartPlace(d.name);
                    setStartPos(d.pos);
                } catch (e) {
                    console.error("geocode err", e);
                }
            }, 600),
        [setStartPlace, setStartPos],
    );

    useEffect(() => {
        let ok = true;
        axios.get("/data.geojson").then((r) => {
            if (ok) setData(r.data);
        });
        return () => {
            ok = false;
        };
    }, []);

    useEffect(() => {
        if (pos) reverseGeocode(pos);
    }, [pos, reverseGeocode]);

    // Redirect mặc định về /ai/suggest nếu vào /ai
    useEffect(() => {
        if (pathname === "/ai" || pathname === "/ai/") {
            navigate("/ai/suggest", { replace: true });
        }
    }, [pathname, navigate]);

    return (
        <div className={styles.container}>
            {/* ── TAB BAR ─────────────────────────────── */}
            <nav className={styles.tabBar}>
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        className={clsx(styles.tabBtn, {
                            [styles.tabActive]: activeTab === t.key,
                        })}
                        onClick={() => navigate(t.path)}
                    >
                        {t.label}
                        {activeTab === t.key && (
                            <span className={styles.tabIndicator} />
                        )}
                    </button>
                ))}
            </nav>

            {/* ── PAGE BODY ───────────────────────────── */}
            <div className={styles.page}>
                {/* SIDEBAR — chỉ hiện ở tab suggest */}
                {activeTab === "suggest" && (
                    <aside
                        className={clsx(styles.sidebar, {
                            [styles.sidebarClosed]: !sidebarOpen,
                        })}
                    >
                        <div className={styles.sidebarScroll}>
                            <p className={styles.sidebarLabel}>Địa điểm</p>
                            <SelectPlaces />
                        </div>
                        <button
                            className={styles.sidebarTab}
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <span
                                className={clsx(styles.tabArrow, {
                                    [styles.tabArrowFlipped]: !sidebarOpen,
                                })}
                            >
                                ‹
                            </span>
                        </button>
                    </aside>
                )}

                {/* CONTENT */}
                <div className={styles.content}>
                    {/* ── TAB: SUGGEST ── */}
                    {activeTab === "suggest" && (
                        <>
                            <section className={styles.mapWrap}>
                                <MapWithMarker
                                    data={data}
                                    pos={pos}
                                    onPosChange={handlePos}
                                />
                                <div className={styles.mapBadge}>
                                    <span className={styles.mapBadgeDot} />
                                    An Giang
                                </div>
                            </section>

                            <section className={styles.panel}>
                                {loading && (
                                    <div className={styles.loadingOverlay}>
                                        <div className={styles.spinnerRing} />
                                        <span className={styles.loadingText}>
                                            Đang tạo hành trình…
                                        </span>
                                    </div>
                                )}

                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardDot} />
                                        <span>Tạo hành trình</span>
                                    </div>
                                    <ReqCreatingTour />
                                </div>

                                <div
                                    className={clsx(
                                        styles.card,
                                        styles.cardGrow,
                                    )}
                                >
                                    <div className={styles.cardHeader}>
                                        <div
                                            className={styles.cardDot}
                                            style={{ background: "#14b8a6" }}
                                        />
                                        <span>Hành trình đề xuất</span>
                                    </div>
                                    <div className={styles.chatBody}>
                                        <BoxChat />
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {/* ── TAB: HISTORIC TOUR ── */}
                    {activeTab === "historic-tour" && (
                        <div className={styles.historicWrap}>
                            <HistoricTour />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
