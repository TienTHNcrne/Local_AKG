/** @format */

import React, { useState, useRef, useEffect } from "react";
import styles from "./Before.module.scss";
export default function Before() {
    const [OcEo] = useState(["/imgs/OcEo-1.png", "/imgs/OcEo-2.png"]);
    const [KS] = useState(["/imgs/KSAG-1.png", "/imgs/KSAG-2.png"]);
    const [TT] = useState(["/imgs/TT-1.png", "/imgs/TT-2.png"]);
    const [KGFR] = useState(["/imgs/KGFR-1.png", "/imgs/KGFR-2.png"]);
    const [TLKG] = useState(["/imgs/TLKG-1.png"]);
    const kgRef = useRef(null);
    const agRef = useRef(null);
    const [place, setPlace] = useState("Kiên Giang");
    useEffect(() => {
        const observer = new IntersectionObserver(
            (e) => {
                e.forEach((value) => {
                    if (value.isIntersecting) {
                        setPlace("An Giang");
                        if (value.target.id === "AG") setPlace("Kiên Giang");
                    }
                });
            },
            { threshold: 0.5 }
        );
        if (kgRef.current) observer.observe(kgRef.current);
        if (agRef.current) observer.observe(agRef.current);

        return () => observer.disconnect();
    }, []);
    const surf = () => {
        if (place === "An Giang" && agRef.current) {
            agRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (place === "Kiên Giang" && kgRef.current) {
            kgRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className={styles.container}>
            <button className={styles.GoToPlace} onClick={surf}>
                Đi đến {place}
            </button>{" "}
            <div className={styles.contentAG} id="AG" ref={agRef}>
                {" "}
                <h3>An Giang - Vùng đất địa linh nhân kiệt</h3>
                <div className={styles.item1}>
                    <div className={styles.MainContent1}>
                        <h4>Từ Óc Eo đến An Giang</h4>
                        <p>
                            Vốn là vùng đất cổ thuộc Thủy Chân Lạp, cư dân Khmer
                            và tộc bản địa sinh sống, gắn với văn hóa Óc Eo rực
                            rỡ – trung tâm giao thương của Phù Nam. Thế kỷ
                            XVII–XVIII, sau hôn nhân công nữ Ngọc Vạn (1620),
                            lưu dân Việt vào khai phá; năm 1757, vua Chân Lạp
                            Nặc Tôn dâng đất Tầm Phong Long (gồm Châu Đốc, Tân
                            Châu,...) cho chúa Nguyễn.
                        </p>
                    </div>
                    <img src={OcEo[0]} alt="Lỗi Ảnh" />
                    <img src={OcEo[1]} alt="Lỗi Ảnh" />
                </div>
                <div className={styles.item2}>
                    <div className={styles.col1}>
                        {" "}
                        <img src={KS[0]} alt="Lỗi Ảnh" />
                    </div>
                    <div className={styles.col2}>
                        <div className={styles.MainContent}>
                            <h4>1832 – Khởi sinh tỉnh An Giang</h4>
                            <p>
                                Vua Minh Mạng lập tỉnh từ đất Châu Đốc và hai
                                huyện của Vĩnh Long, gồm 2 phủ, 4 huyện, tỉnh lỵ
                                đặt tại Châu Đốc. Đây là bước ngoặt mở rộng khẩn
                                hoang, lập ấp, hình thành làng xã mới ven sông
                                Hậu.
                            </p>
                        </div>
                        <img src={KS[1]} alt="Lỗi Ảnh" />
                    </div>
                </div>
                <div className={styles.item3}>
                    {" "}
                    <img src={TT[0]} alt="Lỗi Ảnh" />
                    <div className={styles.MainContent}>
                        <h4>1832 – Khởi sinh tỉnh An Giang</h4>
                        <p>
                            Vua Minh Mạng lập tỉnh từ đất Châu Đốc và hai huyện
                            của Vĩnh Long, gồm 2 phủ, 4 huyện, tỉnh lỵ đặt tại
                            Châu Đốc. Đây là bước ngoặt mở rộng khẩn hoang, lập
                            ấp, hình thành làng xã mới ven sông Hậu.
                        </p>
                    </div>{" "}
                    <img src={TT[1]} alt="Lỗi Ảnh" />
                </div>
            </div>
            <div className={styles.contentKG} id="KG" ref={kgRef}>
                {" "}
                <h3>Kiên Giang - Vùng đất rừng vàng biển bạc</h3>
                <div className={styles.item1}>
                    <div className={styles.MainContent}>
                        <h4>Từ đạo Kiên Giang tiên khởi đến tỉnh Hà Tiên</h4>
                        <p>
                            Kiên Giang từng là một đạo thuộc trấn Hà Tiên – vùng
                            đất mở cõi do Mạc Thiên Tích khai phá từ năm 1757.
                            Đến năm 1808, đạo này được cải lại thành huyện Kiên
                            Giang. Năm 1832, vua Minh Mạng đổi trấn Hà Tiên
                            thành tỉnh Hà Tiên, gồm phủ An Biên và các huyện,
                            trong đó có Kiên Giang.
                        </p>
                    </div>
                </div>
                <div className={styles.item2}>
                    <div className={styles.MainContent}>
                        <h4>Thăng trầm dưới ách Pháp thuộc</h4>
                        <p>
                            Sau năm 1867, Pháp tiến hành tổ chức lại hành chính,
                            tách tỉnh Hà Tiên cũ thành hai tỉnh riêng: Hà Tiên
                            và Rạch Giá, trong đó Rạch Giá vốn là huyện Kiên
                            Giang trước đây.
                        </p>
                    </div>{" "}
                    <img src={KGFR[0]} alt="" />
                    <img src={KGFR[1]} alt="" />
                </div>
                <div className={styles.item3}>
                    <div className={styles.MainContent}>
                        <h4>1976 – Tái lập tỉnh Kiên Giang hiện đại</h4>
                        <p>
                            Tháng 2/1976, tỉnh Kiên Giang được tái lập trên cơ
                            sở tỉnh Rạch Giá và 3 huyện (Châu Thành A, Hà Tiên,
                            Phú Quốc) từ tỉnh Long Châu Hà. Ban đầu tỉnh gồm thị
                            xã Rạch Giá và 8 huyện: An Biên, Châu Thành, Giồng
                            Riềng, Gò Quao, Hà Tiên, Phú Quốc, Tân Hiệp, Vĩnh
                            Thuận.
                        </p>
                    </div>{" "}
                    <img src={TLKG[0]} alt="" />
                </div>
            </div>
        </div>
    );
}
