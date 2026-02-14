import React, { useState } from "react";
import useSuggest from "../../../../Hooks/useSuggest.js";
import GetGps from "../../../../../../../../Hooks/GetGps/GetGps.jsx";
import styles from "./Suggests.module.scss";

export default function Suggests({ value, id, onChoose, setShow }) {
    const suggest = useSuggest(value);
    const [error, setError] = useState(null);

    const handleChoose = (v) => {
        onChoose(v, id);
        setShow(false);
    };

    const handleClick = async () => {
        try {
            const loc = await GetGps();
            handleChoose({
                name: "Your Location",
                lat: loc.lat,
                lng: loc.lng,
            });
        } catch (err) {
            window.alert(
                "Chúng tôi không được cấp quyền truy cập vị trí của bạn!",
            );
            setError(err);
        }
    };

    return (
        <div className={styles.container}>
            {/* Your location */}
            <div className={styles.suggest} onClick={handleClick}>
                <h3>Your location</h3>
            </div>

            {/* Suggest list */}
            {suggest.map((e, idx) => (
                <div
                    className={styles.suggest}
                    key={idx}
                    onClick={() => handleChoose(e)}
                >
                    <h3>{e.name.split(",")[0]}</h3>
                    <p>
                        {e.name
                            .split(",")
                            .slice(1, e.name.split(",").length - 1)
                            .join(", ")}
                    </p>
                </div>
            ))}
        </div>
    );
}
