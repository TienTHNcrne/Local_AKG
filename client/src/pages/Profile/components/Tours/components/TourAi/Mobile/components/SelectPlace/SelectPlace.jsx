import React, { useMemo, useState, useEffect } from "react";
import styles from "./SelectPlace.module.scss";
import clsx from "clsx";
import { useTour } from "../../../Contexts/useTour";
import GetPlace from "../../../Hooks/GetPlace";

export default function SelectPlace({ className }) {
    const Places = GetPlace() ?? [];
    const { setLovePlaces, lovePlaces } = useTour();
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for better UX
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    /* ===== checkbox ALL luôn đúng state ===== */
    const isAllChecked = useMemo(() => {
        if (!Places.length) return false;
        return lovePlaces.size === Places.length;
    }, [lovePlaces, Places.length]);

    /* ===== chọn / bỏ chọn tất cả ===== */
    const toggleAll = (checked) => {
        if (!checked) {
            setLovePlaces(new Map());
            return;
        }

        const newMap = new Map();
        for (const p of Places) {
            newMap.set(p.name, {
                pos: { lat: p.lat, lng: p.lng },
            });
        }
        setLovePlaces(newMap);
    };

    /* ===== toggle 1 place ===== */
    const togglePlace = (place) => {
        setLovePlaces((prev) => {
            const next = new Map(prev);
            if (next.has(place.name)) {
                next.delete(place.name);
            } else {
                next.set(place.name, {
                    pos: { lat: place.lat, lng: place.lng },
                });
            }
            return next;
        });
    };

    /* ===== Thêm haptic feedback cho mobile ===== */
    const handleToggleWithFeedback = (place) => {
        // Vibrate on mobile if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
        togglePlace(place);
    };

    return (
        <div className={clsx(styles.container, className)}>
            <h2 className={styles.title}>Địa điểm muốn đi</h2>

            <div className={styles.choosePlace}>
                {/* ===== CHECK ALL ===== */}
                <div className={styles.checkAll}>
                    <input
                        type="checkbox"
                        id="All"
                        checked={isAllChecked}
                        onChange={(e) => toggleAll(e.target.checked)}
                        disabled={isLoading || !Places.length}
                    />
                    <label htmlFor="All">
                        <h3>Đánh dấu tất cả</h3>
                    </label>
                </div>

                {/* ===== PLACE CARDS ===== */}
                <div className={styles.cards}>
                    {isLoading ? (
                        // Skeleton loading
                        Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className={clsx(styles.card, styles.skeleton)}
                            >
                                <div className={styles.skeletonImage}></div>
                                <div className={styles.text}>
                                    <div className={styles.skeletonText}></div>
                                    <div
                                        className={styles.skeletonSubtext}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : Places.length > 0 ? (
                        Places.map((place) => (
                            <div
                                key={place.name}
                                className={clsx(styles.card, {
                                    [styles.tick]: lovePlaces.has(place.name),
                                })}
                                onClick={() => handleToggleWithFeedback(place)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleToggleWithFeedback(place);
                                    }
                                }}
                                aria-label={`Chọn ${place.name}`}
                            >
                                <img
                                    src={place.img}
                                    alt={place.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/160x120?text=No+Image";
                                    }}
                                />
                                <div className={styles.text}>
                                    <h3>{place.name.split(",")[0]}</h3>
                                    {place.description && (
                                        <p>{place.description}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        // Empty state
                        <div className={styles.emptyState}>
                            <p>Không có địa điểm nào</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
