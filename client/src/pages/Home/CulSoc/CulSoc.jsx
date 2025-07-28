import React from "react";
import picture from "../../../assets/44bc628a7e393ed131750d8aeaea83e7.jpg";
import styles from "./CulSoc.module.scss";
export default function CulSoc() {
    return (
        <div className={styles.container}>
            {/*CULTURE CHARACTERISTIC */}
            <div className={styles.culture}>
                <h3>Dac diem van hoa</h3>

                {/*ETHNIC GROUP */}
                <div className={styles.ethnic}>
                    <div className={styles.title}>
                        <h4>Dân tộc, tôn giáo</h4>
                        <p></p>
                    </div>
                    <div className={styles.item1}>
                        <img src={picture} alt="" />
                    </div>
                    <div className={styles.item1}>
                        <img src={picture} alt="" />
                    </div>
                </div>
                {/*FESTIVAL TRADITIONAL */}
                <div className={styles.festival}>
                    {" "}
                    <div className={styles.item1}>
                        <img src={picture} alt="" />
                    </div>
                    <div className={styles.title}>
                        <h4>Lễ hội truyền thống</h4>
                        <p></p>
                    </div>
                    <div className={styles.item1}>
                        <img src={picture} alt="" />
                    </div>
                </div>
                {/*PROFESSION CRAFT */}
                <div className={styles.craft}>
                    <div className={styles.title}>
                        {" "}
                        <h4>Nghề thủ công truyền thống</h4>
                        <p></p>
                    </div>
                    <div className={styles.item1}>
                        <img src={picture} alt="" />
                    </div>
                </div>
            </div>
            {/* CUSTOM*/}
            <div className={styles.custom}>
                <h3>Phong tucj</h3>
                <p></p>
            </div>
            {/*ECONOMIC */}
            <div className={styles.economic}>
                <h3>Kinh te</h3>
                <p></p>
            </div>
        </div>
    );
}
