/** @format */

import React, { useEffect, useRef } from "react";
import Maps from "../../../components/Maps/Maps";
import styles from "./Location.module.scss";

import {
    FaMapMarkerAlt,
    FaUsers,
    FaCalendarAlt,
    FaMousePointer,
    FaSearchPlus,
} from "react-icons/fa";
import { FaBuffer } from "react-icons/fa6";
import { BsFillGeoFill } from "react-icons/bs";
import { TbArrowsMove } from "react-icons/tb";
import { CgTerrain } from "react-icons/cg";
export default function Location() {
    const mapRef = useRef(null);
    useEffect(() => {
        mapRef.current?.focus();
    }, []);
    return (
        <div className={styles.container}>
            {/* MAP */}
            <div ref={mapRef} tabIndex={-1} className={styles.SectionMap}>
                <Maps className={styles.map} />

                <div className={styles.NotionMap}>
                    <FaMousePointer className={styles.MainIcon} />

                    <h3>Khám phá tương tác</h3>

                    <div className={styles.infoText}>
                        <span className={styles.text}>
                            <strong>Click vào địa điểm</strong> để xem chi tiết
                        </span>

                        <div className={styles.FormInfor}>
                            <strong>Dân số</strong>
                            <strong>Diện tích</strong>
                        </div>
                    </div>

                    <div className={styles.infoHint}>
                        <span>
                            <TbArrowsMove /> Kéo để di chuyển
                        </span>
                        <span>
                            <FaSearchPlus /> Cuộn để phóng to
                        </span>
                    </div>
                </div>
            </div>

            {/* QUICK FACTS */}
            <div className={styles.quickFacts}>
                <div className={styles.ShortInfor}>
                    <FactCard
                        icon={<FaCalendarAlt />}
                        title="Ngày thông qua"
                        highlight="12/06/2025"
                        desc="Nghị quyết 202/2025/QH15"
                    />

                    <FactCard
                        icon={<FaBuffer />}
                        title="Số tỉnh thành mới"
                        highlight="34 tỉnh"
                        desc="Nghị quyết 202/2025/QH15"
                    />

                    <FactCard
                        icon={<FaUsers />}
                        title="Dân số mới"
                        highlight="3.68 triệu người"
                        desc="Quyết định 759-QĐ-TTg"
                    />

                    <FactCard
                        icon={<FaMapMarkerAlt />}
                        title="Diện tích"
                        highlight="9,889 km²"
                        desc="Quyết định 759-QĐ-TTg"
                    />
                </div>
                <div className={styles.LongInfor}>
                    <FactCard
                        icon={<BsFillGeoFill />}
                        title="Vị trí địa lí"
                        highlight="Giao thoa nội địa và biên giới Tây Nam Bộ"
                        desc="An Giang nằm ở phía Tây Nam vùng Đồng bằng sông Cửu Long."
                    />
                    <FactCard
                        icon={<CgTerrain />}
                        title="Địa hình"
                        highlight="Đa dạng: đồng bằng – núi – sông rạch"
                        desc="Địa hình chủ yếu là đồng bằng, xen kẽ núi và hệ thống sông rạch dày đặc."
                    />
                </div>
            </div>
        </div>
    );
}

/* ================= COMPONENT ================= */
function FactCard({ icon, title, highlight, desc }) {
    return (
        <div className={styles.factCard}>
            <div className={styles.icon}>{icon}</div>
            <h4>{title}</h4>
            <p className={styles.highlight}>{highlight}</p>
            <p>{desc}</p>
        </div>
    );
}
