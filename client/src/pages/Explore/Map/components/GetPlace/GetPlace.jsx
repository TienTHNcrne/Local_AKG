import React, { useEffect, useState } from "react";
import Suggests from "./components/Suggest/Suggests";
import styles from "./GetPlace.module.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { TbBikeFilled } from "react-icons/tb";
import { RiWalkFill } from "react-icons/ri";
import axios from "axios";
export default function GetPlace({ setDraw, setShows, shows }) {
    const [focus, setFocus] = useState(null);
    const [data, setData] = useState({ value: "", id: null });
    const [coordinates, setCoordinates] = useState(["", ""]);
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [vehicle, setVehicle] = useState("car");
    const handleChange = (value, id) => {
        const newCoords = [...coordinates];
        newCoords[id] = value;
        setCoordinates(newCoords);
        setData({ value, id });
    };

    const handleChoose = (place, id) => {
        const newCoords = [...coordinates];
        newCoords[id] = place.name;
        setCoordinates(newCoords);

        const newResults = [...results];
        newResults[id] = [Number(place.lng), Number(place.lat)];
        setResults(newResults);
    };

    console.log("Coordinates:", coordinates);
    console.log("Results:", results);
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v2/api/router`, {
                    coordinates: results,
                })
                .then((res) => setDraw(res.data));
        } catch (err) {
            console.log(err.message);
        }
    };
    useEffect(() => {
        if (coordinates.length !== results.length) return;
        try {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v2/api/router`, {
                    coordinates: results,
                })
                .then((res) => setDraw(res.data));
        } catch (err) {
            console.log(err.message);
        }
    }, [vehicle]);
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
                    className={vehicle === "car" ? styles.active : ""}
                    onClick={() => setVehicle("car")}
                >
                    <FaCar />
                    <span>Ô tô</span>
                </button>{" "}
                <button
                    className={vehicle === "walk" ? styles.active : ""}
                    onClick={() => setVehicle("walk")}
                >
                    <RiWalkFill />
                    <span>Đi bộ</span>
                </button>
                <button
                    className={vehicle === "bike" ? styles.active : ""}
                    onClick={() => setVehicle("bike")}
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
                            onFocus={() => {
                                setFocus(id);
                                setData({ value: v, id });
                                setShow(true);
                            }}
                            onBlur={() => setFocus(null)}
                            value={v}
                            onChange={(e) => handleChange(e.target.value, id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setData({ value: v, id });
                                }
                            }}
                        />
                        {focus === id && (
                            <FaMagnifyingGlass
                                onClick={() => setData({ value: v, id })}
                            />
                        )}
                    </div>
                ))}
                {results.every((e) => e !== null) &&
                    results.length === coordinates.length && (
                        <button className={styles.add}>
                            <IoAddCircle
                                onClick={() => {
                                    setCoordinates((e) => [...e, ""]);
                                }}
                            />
                            <span>Thêm điểm đến</span>
                        </button>
                    )}
                <button
                    type="submit"
                    className={styles.submit}
                    disabled={results.length !== coordinates.length}
                    onClick={(e) => onSubmit(e)}
                >
                    Tìm kiếm tuyến đường
                </button>
            </form>

            {/* Suggest list */}
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
