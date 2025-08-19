import React, { useState } from "react";

import styles from "./Ethnic.module.scss";
export default function Ethnic() {
    const [imgs, setImgs] = useState([
        "/imgs/ethnic_1.png",
        "/imgs/ethnic_2.png",
        "/imgs/ethnic_3.png",
        "/imgs/ethnic_4.png",
    ]);
    console.log(imgs);
    return (
        <div className={styles.container}>
            <h3>Dân tộc</h3>{" "}
            <div className={styles.content}>
                <p>
                    An Giang một tỉnh thuộc đồng bằng sông Cửu Long, nơi cộng
                    đồng các dân tộc Kinh, Khmer, Hoa và Chăm cùng sinh sống,
                    đoàn kết và phát triển. Người Kinh chiếm đa số, đóng vai trò
                    nền tảng trong kinh tế – xã hội. Đồng bào Khmer tập trung
                    đông ở vùng biên giới, giữ gìn bản sắc qua lễ hội truyền
                    thống, nhạc ngũ âm, đàn Chà pây; được Nhà nước hỗ trợ hạ
                    tầng, giảm nghèo, nâng cao đời sống. Cộng đồng Chăm chủ yếu
                    theo đạo Hồi, nổi tiếng với nghề dệt, buôn bán, đánh bắt
                    thủy sản. Người Hoa sinh sống rải rác tại đô thị, hoạt động
                    mạnh trong thương mại và tiểu thủ công nghiệp.
                </p>
                <div className={styles.images}>
                    {imgs.map((value, id) => (
                        <img src={value} alt="" />
                    ))}
                </div>
            </div>
        </div>
    );
}
