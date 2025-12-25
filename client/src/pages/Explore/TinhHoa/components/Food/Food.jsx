/** @format */
import React, { useState } from "react";
import styles from "./Food.module.scss";
import Infor from "./components/Infor/Infor.jsx";
export default function Festival({ filteredData }) {
    const [show, setShow] = useState(false);
    const [dataCard, setDataCard] = useState(null);
    return (
        <div className={styles.cards}>
            {show && (
                <Infor
                    name={dataCard.name}
                    place={dataCard.place}
                    price={dataCard.price}
                    smell={dataCard.smell}
                    general={dataCard.general}
                    images={dataCard.imgs}
                    setPopup={setShow}
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
                    <h4>{value.name}</h4>
                    <div className={styles.item}>
                        <p>{value.place}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
