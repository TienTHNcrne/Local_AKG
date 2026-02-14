/** @format */
import React from "react";
import TourAiDesktop from "./Desktop/TourAiDesktop.jsx";
import TourAiMobile from "./Mobile/TourAiMobile.jsx";
import styles from "./TourAi.module.scss";
import { useMediaQuery } from "react-responsive";
import TourProvide from "./Contexts/useTour.jsx";
export function Action({ setHide }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className={styles.container}>
            {isMobile ? (
                <TourAiMobile setHide={setHide} />
            ) : (
                <TourAiDesktop setHide={setHide} />
            )}
        </div>
    );
}

export default function TourAi({ setHide }) {
    return (
        <TourProvide>
            <Action setHide={setHide} />
        </TourProvide>
    );
}
