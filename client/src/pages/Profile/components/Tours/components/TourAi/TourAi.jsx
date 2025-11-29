/** @format */
import React from 'react';
import TourAiDesktop from './Desktop/TourAiDesktop.jsx';
import styles from './TourAi.module.scss';
export default function TourAi({ setHide }) {
    return (
        <div className={styles.container}>
            <TourAiDesktop setHide={setHide} />
        </div>
    );
}
