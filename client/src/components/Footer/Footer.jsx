import React from "react";
import styles from "./Footer.module.scss";

const footerSections = [
    {
        title: "Thông tin",
        links: ["Về chúng tôi", "Liên hệ"],
    },
    {
        title: "Nguồn tài nguyên",
        links: ["Hình ảnh An Giang", "Bản đồ du lịch"],
    },
    {
        title: "Chính sách",
        links: ["Điều khoản", "Chính sách bảo mật"],
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {footerSections.map((section, index) => (
                    <div key={index} className={styles.section}>
                        <h4>{section.title}</h4>
                        <ul>
                            {section.links.map((link, i) => (
                                <li key={i}>{link}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className={styles.footerNote}>
                © 2025 - Dự án Du lịch An Giang. Hình ảnh sử dụng từ các nguồn
                công khai, có trích dẫn tại từng mục.
            </div>
        </footer>
    );
}
