import React, { useState } from "react";
import styles from "./CulSoc.module.scss";
import Ethnic from "./components/Ethnic/ethnic";
import Festival from "./components/Festival/Festival";
export default function CulSoc() {
    const [panel, setPanel] = useState("/panel_1.jpg");
    return (
        <div>
            <div className={styles.banner}>
                {" "}
                <img src={panel} alt="" />
                <h2>Dân tộc - Lễ Hội ở An Giang</h2>
            </div>
            <div className={styles.content}>
                <Ethnic />
                <Festival />
            </div>
        </div>
    );
}
