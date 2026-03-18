/** @format */
import React, { useMemo } from "react";
import styles from "./SelectPlace.module.scss";
import clsx from "clsx";
import GetPlace from "../../../Hooks/GetPlace";
import { useTour } from "../../../Contexts/useTour";

export default function SelectPlace({ className }) {
    const places = GetPlace() ?? [];
    const { lovePlaces, setLovePlaces } = useTour();

    const isAllChecked = useMemo(
        () => places.length > 0 && lovePlaces.size === places.length,
        [lovePlaces.size, places.length],
    );

    const toggleAll = (checked) => {
        if (!checked) {
            setLovePlaces(new Map());
            return;
        }
        const next = new Map();
        for (const p of places)
            next.set(p.name, { pos: { lat: p.lat, lng: p.lng } });
        setLovePlaces(next);
    };

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

            {/* Danh sách */}
            <div className={styles.list}>
                {places.map((place) => {
                    const selected = lovePlaces.has(place.name);
                    return (
                        <div
                            key={place.name}
                            className={clsx(styles.card, {
                                [styles.selected]: selected,
                            })}
                            onClick={() => togglePlace(place)}
                        >
                            <img src={place.img} alt={place.name} />
                            <span className={styles.name}>
                                {place.name.split(",")[0]}
                            </span>
                            {selected && <span className={styles.tick}>✓</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
