/** @format */
import React, { useMemo } from "react";
import styles from "./SelectPlaces.module.scss";
import clsx from "clsx";
import GetPlace from "../../../Hooks/GetPlace";
import { useTour } from "../../../Contexts/useTour";

// ── Component ─────────────────────────────────────────────────────────────────
export default function SelectPlaces({ className }) {
    const places = GetPlace() ?? [];
    const { lovePlaces, setLovePlaces } = useTour();

    // true nếu tất cả địa điểm đã được chọn
    const isAllChecked = useMemo(
        () => places.length > 0 && lovePlaces.size === places.length,
        [lovePlaces.size, places.length],
    );

    // Chọn / bỏ chọn tất cả
    const toggleAll = (checked) => {
        if (!checked) {
            setLovePlaces(new Map());
            return;
        }
        const next = new Map();
        for (const p of places) {
            next.set(p.name, { pos: { lat: p.lat, lng: p.lng } });
        }
        setLovePlaces(next);
    };

    // Chọn / bỏ chọn 1 địa điểm
    const togglePlace = (place) => {
        setLovePlaces((prev) => {
            const next = new Map(prev);
            next.has(place.name)
                ? next.delete(place.name)
                : next.set(place.name, {
                      pos: { lat: place.lat, lng: place.lng },
                  });
            return next;
        });
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={clsx(styles.wrap, className)}>
            {/* Chọn tất cả */}
            <label className={styles.checkAll}>
                <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={(e) => toggleAll(e.target.checked)}
                />
                <span>Chọn tất cả</span>
                <span className={styles.count}>
                    {lovePlaces.size}/{places.length}
                </span>
            </label>

            {/* Danh sách địa điểm */}
            <div className={styles.list}>
                {places.map((place) => (
                    <div
                        key={place.name}
                        className={clsx(styles.card, {
                            [styles.selected]: lovePlaces.has(place.name),
                        })}
                        onClick={() => togglePlace(place)}
                    >
                        <img src={place.img} alt={place.name} />

                        <span className={styles.name}>
                            {place.name.split(",")[0]}
                        </span>

                        {lovePlaces.has(place.name) && (
                            <span className={styles.tick}>✓</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
