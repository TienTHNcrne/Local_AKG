/** @format */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";

import MapMarker from "../LeafletFunction/MapMarker/MapMarker";
import SelectPlace from "./components/SelectPlace/SelectPlace";
import ReqCreatingTourMobile from "./components/ReqCreatingTourMobile/ReqCreatingTourMobile";
import BoxChatMobile from "./components/BoxChatMobile/BoxChatMobile";
import TourHistory from "../Desktop/components/TourHistory/TourHistory";
import { useTour } from "../Contexts/useTour";
import styles from "./TourAiMobile.module.scss";

const TABS = [
    { key: "place", label: "Địa điểm" },
    { key: "create", label: "Tạo tour" },
    { key: "history", label: "Lịch sử" },
];

export default function TourAiMobile() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { loading, setStartPos, setStartPlace } = useTour();

    const [tab, setTab] = useState("create");
    const [pos, setPos] = useState(null);
    const geoCache = useRef({});

    /* ── Reverse-geocode whenever pos changes ── */
    useEffect(() => {
        if (!pos) return;

        const key = `${pos.lat.toFixed(5)}-${pos.lng.toFixed(5)}`;

        if (geoCache.current[key]) {
            const { name, pos: cachedPos } = geoCache.current[key];
            setStartPlace(name);
            setStartPos(cachedPos);
            return;
        }

        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/TradePosToAdd`, {
                lat: pos.lat,
                lng: pos.lng,
            })
            .then(({ data }) => {
                const result = {
                    name: data.display_name,
                    pos: { lat: data.lat, lng: data.lon },
                };
                geoCache.current[key] = result;
                setStartPlace(result.name);
                setStartPos(result.pos);
            })
            .catch((err) => console.error("Geocode error:", err));
    }, [pos, setStartPlace, setStartPos]);

    /* ── Lock body scroll ── */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const activeRoute = pathname.startsWith("/ai/historic-tour")
        ? "history"
        : "suggest";

    const currentTab = activeRoute === "history" ? "history" : tab;

    const handleTabClick = (t) => {
        if (t.key === "history") {
            navigate("/ai/historic-tour");
        } else {
            if (pathname !== "/ai/suggest") navigate("/ai/suggest");
            setTab(t.key);
        }
    };

    const mapBadge = (
        <div className={styles.mapBadge}>
            <span className={styles.mapDot} />
            An Giang
        </div>
    );

    return (
        <div className={styles.page}>
            {/* ── Tab bar ── */}
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

            {/* ── Content ── */}
            <div className={styles.body}>
                {/* Place */}
                {currentTab === "place" && (
                    <div className={styles.placeList}>
                        <SelectPlace />
                    </div>
                )}

                {/* Create */}
                {currentTab === "create" && (
                    <div className={styles.createView}>
                        <div className={styles.mapWrap}>
                            <MapMarker pos={pos} onPosChange={setPos} />
                            {mapBadge}
                        </div>

                        {/* panel = scroll container, panelInner = natural-height content */}
                        <div className={styles.panel}>
                            <div className={styles.panelInner}>
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

                                <div className={styles.card}>
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
                    </div>
                )}

                {currentTab === "history" && (
                    <div className={styles.historyView}>
                        <TourHistory />
                    </div>
                )}
            </div>
        </div>
    );
}
