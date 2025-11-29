import React, { useState } from "react";

import GetDesMain from "../../../Map/components/GetDesMain/GetDesMain";
import styles from "./Place.module.scss";
export default function Place({ filteredData }) {
    const [dataCard, setDataCard] = useState(null);
    const [popup, setPopup] = useState(false);
    const getAddress = (s) => {
        if (!s || typeof s !== "string") return "";
        const a = s.split(",");
        if (a.length <= 2) return "";
        const maxParts = 5;
        let address = "";
        for (let i = 1; i < Math.min(a.length - 1, maxParts); i++) {
            address +=
                a[i] + (i < Math.min(a.length - 1, maxParts) - 1 ? "," : "");
        }
        return address;
    };
    console.log(filteredData);
    return (
        <div>
            {popup && (
                <GetDesMain
                    name={dataCard.name.split(",")[0]}
                    time={dataCard.time}
                    category={dataCard.category}
                    address={getAddress(dataCard.name)}
                    general={dataCard.description}
                    images={dataCard.img}
                    lat={dataCard.lat}
                    lng={dataCard.lng}
                    setPopup={setPopup}
                />
            )}

            <div className={styles.cards}>
                {filteredData.map((value, id) => (
                    <div
                        className={styles.card}
                        key={id}
                        onClick={() => {
                            setDataCard(value);
                            setPopup(true);
                        }}
                    >
                        {value.img.length > 0 && (
                            <img
                                src={
                                    value.img[
                                        Math.floor(
                                            Math.random() * value.img.length
                                        )
                                    ]
                                }
                                alt=""
                            />
                        )}
                        <h4>{value.name.split(",")[0]}</h4>
                        <div className={styles.categories}>
                            {value.category?.map((v, id) => (
                                <h5>{v}</h5>
                            ))}
                        </div>
                        <p>{getAddress(value.name)}</p>
                    </div>
                ))}
                {filteredData.length === 0 && (
                    <p>Không tìm thấy kết quả phù hợp.</p>
                )}
            </div>
        </div>
    );
}
