import React, { useState } from "react";

import styles from "./Festival.module.scss";
import { festival } from "../../../../../data/festival";
export default function Festival() {
    const [imgsKinh, setImgsKinh] = useState([
        "/imgs/festival/kinh/1.jpg",
        "/imgs/festival/kinh/2.jpg",
        "/imgs/festival/kinh/3.jpg",
        "/imgs/festival/kinh/4.jpg",
        "/imgs/festival/kinh/5.jpg",
        "/imgs/festival/kinh/6.jpg",
        "/imgs/festival/kinh/7.jpg",
        "/imgs/festival/kinh/8.jpg",
    ]);
    const [imgsKm, setImgsKm] = useState([
        "/imgs/festival/km/1.jpeg",
        "/imgs/festival/km/2.jpg",
        "/imgs/festival/km/3.jpg",
        "/imgs/festival/km/4.jpg",
    ]);
    const [imgsHoa, setImgsHoa] = useState([
        "/imgs/festival/hoa/1.jpg",
        "/imgs/festival/hoa/2.jpg",
    ]);
    const [imgsCham, setImgsCham] = useState([
        "/imgs/festival/cham/1.jpg",
        "/imgs/festival/cham/2.jpg",
        "/imgs/festival/cham/3.jpg",
    ]);
    const choose = (id, place) => {
        if (place === 1) return imgsKinh[id];
        if (place === 2) return imgsKm[id];
        if (place === 3) return imgsHoa[id];
        return imgsCham[id];
    };
    return (
        <div className={styles.container}>
            <h3>Lễ Hội</h3>
            <div className={styles.content}>
                {festival.map((value, id) => (
                    <div className={styles.ethnic} key={id}>
                        <h4>{value.ethnic}</h4>
                        <div className={styles.cards}>
                            {value.festival.map((val, ide) => (
                                <div className={styles.card} key={ide}>
                                    <div className={styles.cardContent}>
                                        <div className={styles.header}>
                                            <img
                                                src={choose(
                                                    ide,
                                                    value.id_place
                                                )}
                                                alt=""
                                            />
                                            <h5>{val.event}</h5>
                                        </div>{" "}
                                        <div className={styles.mainContent}>
                                            <h6>Địa điểm tổ chức</h6>
                                            <p>{val.place}</p>
                                        </div>{" "}
                                        <div className={styles.mainContent}>
                                            <h6>Thời gian tổ chức</h6>
                                            <p>{val.time}</p>
                                        </div>{" "}
                                        <div className={styles.mainContent}>
                                            <h6>Giới thiệu</h6>
                                            <p>{val.introduction}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
