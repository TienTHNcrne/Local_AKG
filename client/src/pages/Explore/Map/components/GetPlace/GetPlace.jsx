import React, { useEffect, useState } from "react";
import axios from "axios";
import Suggests from "./components/Suggest/Suggests";
import styles from "./GetPlace.module.scss";
import { FaCar } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { TbBikeFilled } from "react-icons/tb";
import { RiWalkFill } from "react-icons/ri";
import { useMapContext } from "../contexts/useMapContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
export default function GetPlace({ setDraw, setShows, shows }) {
    const { inFor, setDurDis, setShowD } = useMapContext();
    const [data, setData] = useState({ value: "", id: null });
    const [coordinates, setCoordinates] = useState(["", ""]);
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [vehicle, setVehicle] = useState("driving-car");
    const [preVe, setPreVe] = useState("driving-car");

    // Update coordinates when inFor changes
    useEffect(() => {
        if (!inFor || Object.keys(inFor).length === 0) return;

        setCoordinates((prev) => {
            const newCoords = [...prev];
            newCoords[1] = inFor.name;
            return newCoords;
        });

        setResults((prev) => {
            const newRes = [...prev];
            newRes[1] = [Number(inFor.lng), Number(inFor.lat)];
            return newRes;
        });
    }, [inFor?.lat, inFor?.lng, inFor?.name]);

    const handleChange = (value, id) => {
        setCoordinates((prev) => {
            const newCoords = [...prev];
            newCoords[id] = value;
            return newCoords;
        });
        setData({ value, id });
    };

    const handleChoose = (place, id) => {
        setCoordinates((prev) => {
            const newCoords = [...prev];
            newCoords[id] = place.name;
            return newCoords;
        });

        setResults((prev) => {
            const newRes = [...prev];
            newRes[id] = [Number(place.lng), Number(place.lat)];
            return newRes;
        });
    };

    const fetchRoute = async (coords) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v2/api/router`,
                {
                    coordinates: coords,
                    profile: vehicle,
                }
            );

            setDraw(res.data);
            setPreVe(vehicle);

            let distance = 0,
                duration = 0;
            res.data.features.forEach((value) => {
                distance += value.properties.summary.distance;
                duration += value.properties.summary.duration;
            });
            setDurDis({ distance, duration });
            setShowD(true);
        } catch (err) {
            window.alert("Phương tiện không khả thi");
            console.log(err.message);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (results.length === coordinates.length) fetchRoute(results);
    };

    // Update route when vehicle changes
    useEffect(() => {
        if (coordinates.length !== results.length) return;
        fetchRoute(results).catch(() => setVehicle(preVe));
    }, [vehicle]);

    const check = () => {
        let check = 0;
        results.forEach((value) => {
            ++check;
        });
        console.log(check);
        return check === results.length;
    };
    return (
        <div
            className={`${styles.container} ${
                shows ? styles.open : styles.closes
            }`}
        >
            <button className={styles.close} onClick={() => setShows(false)}>
                &times;
            </button>

            <div className={styles.traffics}>
                <button
                    className={vehicle === "driving-car" ? styles.active : ""}
                    onClick={() => setVehicle("driving-car")}
                >
                    <FaCar />
                    <span>Ô tô</span>
                </button>
                <button
                    className={vehicle === "foot-walking" ? styles.active : ""}
                    onClick={() => setVehicle("foot-walking")}
                >
                    <RiWalkFill />
                    <span>Đi bộ</span>
                </button>
                <button
                    className={
                        vehicle === "cycling-regular" ? styles.active : ""
                    }
                    onClick={() => setVehicle("cycling-regular")}
                >
                    <TbBikeFilled />
                    <span>Xe đạp</span>
                </button>
            </div>

            <form className={styles.items}>
                {coordinates.map((v, id) => (
                    <div key={id} className={styles.item}>
                        <input
                            required
                            type="text"
                            value={v}
                            onFocus={() => {
                                setData({ value: v, id });
                                setShow(true);
                            }}
                            onChange={(e) => handleChange(e.target.value, id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setData({ value: v, id });
                                }
                            }}
                        />
                        {coordinates.length > 2 && (
                            <button
                                className={styles.remove}
                                onClick={() => {
                                    setCoordinates((prev) =>
                                        prev.filter((_, i) => i !== id)
                                    );
                                    setResults((prev) =>
                                        prev.filter((_, i) => i !== id)
                                    );
                                }}
                            >
                                {" "}
                                <RiDeleteBin2Fill />
                            </button>
                        )}
                    </div>
                ))}

                {check() && results.length === coordinates.length && (
                    <button
                        className={styles.add}
                        onClick={(e) => {
                            e.preventDefault();
                            setCoordinates((prev) => [...prev, ""]);
                        }}
                    >
                        <IoAddCircle />
                        <span>Thêm điểm đến</span>
                    </button>
                )}

                <button
                    type="submit"
                    className={styles.submit}
                    disabled={!check() || results.length !== coordinates.length}
                    onClick={onSubmit}
                >
                    Tìm kiếm tuyến đường
                </button>
            </form>

            {show && (
                <Suggests
                    value={data.value}
                    id={data.id}
                    onChoose={handleChoose}
                    setShow={setShow}
                />
            )}
        </div>
    );
}
