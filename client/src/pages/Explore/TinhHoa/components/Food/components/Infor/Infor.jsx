/** @format */

import React, { useState } from "react";

import styles from "./Infor.module.scss";
export default function Infor({
    name,
    place,
    smell,
    price,
    general,
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
                            <h4>Giới thiệu</h4>
                            <p>{general}</p>
                        </div>
                        <div className={styles.mainContent}>
                            <h4>Hương vị</h4>
                            <p>{smell}</p>
                        </div>{" "}
                        <div className={styles.mainContent}>
                            <h4>Địa điểm</h4>
                            <p>{place}</p>
                        </div>{" "}
                        <div className={styles.mainContent}>
                            <h4>Giá tiền</h4> <p>{price}</p>
                        </div>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
