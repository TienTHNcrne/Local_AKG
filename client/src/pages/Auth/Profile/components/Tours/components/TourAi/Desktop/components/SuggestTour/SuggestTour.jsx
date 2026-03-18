import React, { useEffect, useRef, useState } from "react";
import styles from "./SuggestTour.module.scss";
import clsx from "clsx";
import axios from "axios";

import { useTour } from "../../../Contexts/useTour";
import MapMarker from "../../../LeafletFunction/MapMarker/MapMarker";
import ReqCreatingTour from "../ReqCreatingTour/ReqCreatingTour";
import BoxChat from "../BoxChat/BoxChat";
export default function SuggestTour() {
    const { loading, setStartPos, setStartPlace } = useTour();
    const [pos, setPos] = useState(null);

    const geoCache = useRef({});

    useEffect(() => {
        if (!pos) return;
        // check trong cache
        const key = `${pos.lat.toFixed(5)}-${pos.lng.toFixed(5)}`;
        if (geoCache.current[key]) {
            const cached = geoCache.current[key];
            setStartPos(cached.name);
            setStartPos(cached.pos);
            return;
        }
        //call
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/TradePosToAdd`, {
                lat: pos.lat,
                lng: pos.lng,
            })
            .then((res) => {
                const result = {
                    name: res.data.display_name,
                    pos: { lat: res.data.lat, lng: res.data.lon },
                };
                geoCache.current[key] = result;
                setStartPlace(result.name);
                setStartPos(result.pos);
            })
            .catch((err) => {
                console.error("Geocode error:", err);
            });
    }, [pos, setStartPlace, setStartPos]);
    return (
        <>
            <div className={styles.mapWrap}>
                <MapMarker pos={pos} onPosChange={setPos} />
                <div className={styles.mapBadge}>
                    <span className={styles.mapBadgeDot} />
                    An Giang
                </div>
            </div>

            <div className={styles.panel}>
                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.spinnerRing} />
                        <span className={styles.loadingText}>
                            Đang tạo hành trình…
                        </span>
                    </div>
                )}

                {/* Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardDot} />
                        <span>Tạo hành trình</span>
                    </div>
                    <ReqCreatingTour />
                </div>

                <div className={clsx(styles.card, styles.cardGrow)}>
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
            </div>
        </>
    );
}
