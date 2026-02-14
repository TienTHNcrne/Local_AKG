/** @format */
import React, { useMemo } from "react";
import styles from "./SelectPlaces.module.scss";
import clsx from "clsx";
import GetPlace from "../../../Hooks/GetPlace";
import { useTour } from "../../../Contexts/useTour";

export default function SelectPlaces({ className }) {
    const Places = GetPlace() ?? [];
    const { setLovePlaces, lovePlaces } = useTour();

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

    return (
        <div className={className}>
            <h2>Địa điểm muốn đi</h2>

            <div className={styles.choosePlace}>
                {/* ===== CHECK ALL ===== */}
                <div className={styles.checkAll}>
                    <input
                        type="checkbox"
                        id="All"
                        checked={isAllChecked}
                        onChange={(e) => toggleAll(e.target.checked)}
                    />
                    <label htmlFor="All">
                        <h3>Đánh dấu tất cả</h3>
                    </label>
                </div>

                {/* ===== PLACE CARDS ===== */}
                <div className={styles.cards}>
                    {Places.map((place) => (
                        <div
                            key={place.name}
                            className={clsx(styles.card, {
                                [styles.tick]: lovePlaces.has(place.name),
                            })}
                            onClick={() => togglePlace(place)}
                        >
                            <img src={place.img} alt={place.name} />
                            <div className={styles.text}>
                                <h3>{place.name.split(",")[0]}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
