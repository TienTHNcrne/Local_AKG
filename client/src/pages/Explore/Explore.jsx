import React from "react";
import styles from "./Explore.module.scss";
import food from "../../assets/Good_Food_Display_-_NCI_Visuals_Online.jpg";
import dltc from "../../assets/images.jpg";
import fes from "../../assets/Perfume-pagoda-festival.jpg";
import play from "../../assets/khu-vui-choi-tre-em-kids-city-jpeg.webp";
import land from "../../assets/hinh-anh-review-khác-san-landmark-81-tien-ich-&-gia-phong-moi-nhat-so-2.jpg";
export default function Explore() {
    const data = [
        {
            id: 1,
            picture: fes,
            tag: "fes",
            title: "festival",
            description: "dfgdfgdfgfdgdfgfdgdfgfdgfdgdfgdf",
        },
        {
            id: 2,
            picture: play,
            tag: "play",
            title: "play",
            description: "none",
        },
        {
            id: 3,
            picture: dltc,
            tag: "dtlc",
            title: "dltc",
            description: "none",
        },
        {
            id: 4,
            picture: food,
            tag: "food",
            title: "food",
            description: "none",
        },
        {
            id: 5,
            picture: land,
            tag: "landt",
            title: "land",
            description: "none",
        },
    ];
    return (
        <div className={styles.contain}>
            <h1>Explore</h1>
            <div className={styles.grid}>
                {data.map((value, id) => (
                    <div key={id} className={styles.card}>
                        <img src={value.picture} alt="" />
                        <div className={styles.content}>
                            <div className={styles.head}>
                                <h3>{value.title}</h3>
                            </div>
                            <div className={styles.bod}>
                                <p>{value.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
