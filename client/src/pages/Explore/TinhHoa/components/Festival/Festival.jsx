/** @format */
import React, { useState } from "react";
import styles from "./Festival.module.scss";
import Infor from "./components/Infor/Infor";
export default function Festival({ filteredData }) {
    const [show, setShow] = useState(false);
    const [dataCard, setDataCard] = useState(null);
    return (
        <div className={styles.cards}>
            {" "}
            {show && (
                <Infor
                    setPopup={setShow}
                    name={dataCard.name}
                    description={dataCard.description}
                    images={dataCard.imgs}
                    time={dataCard.time}
                    place={dataCard.place}
                />
            )}
            {filteredData.map((value, id) => (
                <div
                    className={styles.card}
                    key={id}
                    onClick={() => {
                        setShow(true);
                        setDataCard(value);
                    }}
                >
                    {value.imgs.length > 0 && (
                        <img
                            src={
                                value.imgs[
                                    Math.floor(
                                        Math.random() * value.imgs.length
                                    )
                                ]
                            }
                        />
                    )}
                    <div className={styles.ok}>
                        <h4>{value.name}</h4>
                        <div className={styles.item}>
                            <p>{value.place}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
