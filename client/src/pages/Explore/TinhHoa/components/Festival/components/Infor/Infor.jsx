/** @format */

import React, { useState } from "react";

import styles from "./Infor.module.scss";
export default function Infor({
    name,
    time,
    description,
    place,
    images,
    setPopup,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {" "}
                <div className={styles.header}>
                    <button onClick={() => setPopup(false)}>&times;</button>
                </div>
                <div className={styles.body}>
                    {images.length > 0 && (
                        <img
                            src={
                                images[
                                    Math.floor(Math.random() * images.length)
                                ]
                            }
                            alt=""
                        />
                    )}
                    <div className={styles.main}>
                        <div className={styles.mainContent}>
                            <h2>{name}</h2>
                        </div>{" "}
                        <div className={styles.mainContent}>
                            <h4>Thời gian</h4>
                            {time.map((value) => (
                                <p>{value}</p>
                            ))}
                        </div>{" "}
                        <div className={styles.mainContent}>
                            <h4>Địa điểm</h4>
                            <p>{place}</p>
                        </div>{" "}
                        <div className={styles.mainContent}>
                            <h4>Ý nghĩa – nguồn gốc – vai trò:</h4>
                            <p>{description}</p>
                        </div>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
