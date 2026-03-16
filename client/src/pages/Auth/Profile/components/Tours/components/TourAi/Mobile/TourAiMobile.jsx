/** @format */
import React, {
    useEffect,
    useState,
    useRef,
    useMemo,
    useCallback,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import L from "leaflet";

import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import SelectPlace from "./components/SelectPlace/SelectPlace";
import ReqCreatingTourMobile from "./components/ReqCreatingTourMobile/ReqCreatingTourMobile";
import BoxChatMobile from "./components/BoxChatMobile/BoxChatMobile";
import TourHistory from "../Desktop/components/TourHistory/TourHistory";
import GetLocation from "../LeafletFunction/GetLocation";
import PickLocation from "../LeafletFunction/PickLocation";
import { useTour } from "../Contexts/useTour";
import styles from "./TourAiMobile.module.scss";

/* ── fix default icon ── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TABS = [
    { key: "place", label: "Địa điểm", icon: "🗺️", path: "/ai/suggest" },
    { key: "create", label: "Tạo tour", icon: "🏗️", path: "/ai/suggest" },
    { key: "history", label: "Lịch sử", icon: "📚", path: "/ai/historic-tour" },
];

/* ── GeoJSON layer ── */
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

/* ── Marker layer ── */
const PosMarker = React.memo(({ pos }) =>
    pos ? <Marker position={pos} /> : null,
);

/* ── Smooth map — chỉ re-render khi data/pos thay đổi ── */
const MapView = React.memo(
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
            inertiaDeceleration={1500}
            inertiaMaxSpeed={1200}
            zoomAnimation={true}
            wheelPxPerZoomLevel={60}
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

/* ================= MAIN ================= */
export default function TourAiMobile() {
    const { setStartPlace, setStartPos, loading } = useTour();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Tab nội bộ (place / create) — history đi theo route
    const [tab, setTab] = useState("create");
    const activeRoute = pathname.startsWith("/ai/historic-tour")
        ? "history"
        : "suggest";

    const [data, setData] = useState(null);
    const [pos, setPos] = useState(null);
    const geoCache = useRef(new Map());

    const handlePos = useCallback((p) => setPos(p), []);

    /* debounce reverse-geocode */
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

    // Khoá body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleTabClick = (t) => {
        if (t.key === "history") {
            navigate("/ai/historic-tour");
        } else {
            if (pathname !== "/ai/suggest") navigate("/ai/suggest");
            setTab(t.key);
        }
    };

    const currentTab = activeRoute === "history" ? "history" : tab;

    return (
        <div className={styles.page}>
            {/* ── TAB BAR (bottom) ─────────────────────── */}
            <nav className={styles.tabBar}>
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        className={clsx(styles.tabBtn, {
                            [styles.tabActive]: currentTab === t.key,
                        })}
                        onClick={() => handleTabClick(t)}
                    >
                        <span className={styles.tabIcon}>{t.icon}</span>
                        <span className={styles.tabLabel}>{t.label}</span>
                        {currentTab === t.key && (
                            <span className={styles.tabDot} />
                        )}
                    </button>
                ))}
            </nav>

            {/* ── CONTENT ──────────────────────────────── */}
            <div className={styles.body}>
                {/* TAB: PLACE */}
                {currentTab === "place" && (
                    <div className={styles.placeView}>
                        <div className={styles.mapWrap}>
                            <MapView
                                data={data}
                                pos={pos}
                                onPosChange={handlePos}
                            />
                            <div className={styles.mapBadge}>
                                <span className={styles.mapDot} />
                                An Giang
                            </div>
                        </div>
                        <div className={styles.placeList}>
                            <SelectPlace />
                        </div>
                    </div>
                )}

                {/* TAB: CREATE */}
                {currentTab === "create" && (
                    <div className={styles.createView}>
                        <div className={styles.mapWrap}>
                            <MapView
                                data={data}
                                pos={pos}
                                onPosChange={handlePos}
                            />
                            <div className={styles.mapBadge}>
                                <span className={styles.mapDot} />
                                An Giang
                            </div>
                        </div>

                        <div className={styles.panel}>
                            {loading && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinnerRing} />
                                    <span className={styles.loadingText}>
                                        Đang tạo…
                                    </span>
                                </div>
                            )}

                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardDot} />
                                    Tạo hành trình
                                </div>
                                <ReqCreatingTourMobile />
                            </div>

                            <div className={clsx(styles.card, styles.cardGrow)}>
                                <div className={styles.cardHeader}>
                                    <span
                                        className={styles.cardDot}
                                        style={{ background: "#14b8a6" }}
                                    />
                                    Hành trình đề xuất
                                </div>
                                <div className={styles.chatBody}>
                                    <BoxChatMobile />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: HISTORY */}
                {currentTab === "history" && (
                    <div className={styles.historyView}>
                        <TourHistory />
                    </div>
                )}
            </div>
        </div>
    );
}
