/** @format */
import React from "react";
import styles from "./Home.module.scss";
import "@ant-design/v5-patch-for-react-19";
// ------ IMPORT COMPONENTS -------
import Row1 from "./Row1/Row1";
import Row2 from "./Row2/Row2";
import Row3 from "./Row3/Row3";

import { FaRoute } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
export default function Home() {
    return (
        <div className={styles.container}>
            <Row1 />
            <Row2 />
            <Row3 />
        </div>
    );
}
