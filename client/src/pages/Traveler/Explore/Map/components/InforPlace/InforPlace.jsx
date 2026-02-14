/** @format */
import React, { useState } from "react";
import styles from "./InforPlace.module.scss";
import General from "./components/General/General";
import Comments from "./components/Comments/Comments";
import Weather from "./components/Weather/Weather";
import { FaCaretLeft } from "react-icons/fa";
export default function InForPlace({
    center,
    popup,
    setPopup,
    inFor,
    setDraw,
    setShows,
    shows,
}) {
    const MainName = inFor?.name?.split(",")[0];
    const images = Array.isArray(inFor?.img) ? inFor.img : [];
    const [choose, setChoose] = useState("general");
    return (
        <div
            className={`${styles.container} ${
                popup ? styles.open : styles.close
            }`}
        >
            <div className={styles.first}>
                <div className={styles.header}>
                    <div className={styles.images}>
                        {images.length > 0 &&
                            images.map((value, id) => (
                                <img
                                    src={value}
                                    alt={`Ảnh ${id + 1}`}
                                    key={id}
                                />
                            ))}
                    </div>
                    <h1>{MainName}</h1>
                    <div className={styles.category}>
                        {inFor.category &&
                            inFor.category.map((value, id) => (
                                <p className={styles.tag} key={id}>
                                    {value}
                                </p>
                            ))}
                    </div>
                    <div className={styles.option}>
                        <div className={styles.general}>
                            <h4
                                className={
                                    choose === "general"
                                        ? styles.processing
                                        : ""
                                }
                                onClick={() => {
                                    setChoose("general");
                                }}
                            >
                                Tổng quan{" "}
                            </h4>
                        </div>{" "}
                        <div className={styles.weather}>
                            <h4
                                className={
                                    choose === "weather"
                                        ? styles.processing
                                        : ""
                                }
                                onClick={() => {
                                    setChoose("weather");
                                }}
                            >
                                Thời tiết
                            </h4>
                        </div>
                        <div className={styles.rate}>
                            <h4
                                className={
                                    choose === "rate" ? styles.processing : ""
                                }
                                onClick={() => {
                                    setChoose("rate");
                                }}
                            >
                                Đánh giá
                            </h4>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    {choose === "general" && (
                        <General
                            description={inFor.description}
                            address={inFor.name}
                            center={center}
                            img={images.length > 0 && images[0]}
                            setDraw={setDraw}
                            setShows={setShows}
                            setPopup={setPopup}
                        />
                    )}
                    {choose === "rate" && (
                        <Comments lat={center.lat} lng={center.lng} />
                    )}
                    {choose === "weather" && <Weather center={center} />}
                </div>
            </div>
            {/*SECOND */}
            <div className={styles.second}>
                <button
                    onClick={() => {
                        setPopup(false);
                    }}
                >
                    <FaCaretLeft />
                </button>
            </div>
        </div>
    );
}
