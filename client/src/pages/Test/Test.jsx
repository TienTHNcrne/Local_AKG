import React from "react";
import styles from "./Test.module.scss";

export default function Test() {
    const pageHome = new URL(
        "../../assets/poster/pagehome.png",
        import.meta.url,
    ).href;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* ===== HEADER ===== */}
                <div className={styles.header}>
                    <h2>
                        Cuộc thi Khoa học Kỹ thuật dành cho học sinh cấp trung
                        học năm học 2025 – 2026
                    </h2>

                    <h1>
                        TÁC ĐỘNG CỦA AGILAND – WEBSITE HỖ TRỢ PHÁT TRIỂN DU LỊCH
                        TỈNH AN GIANG, ĐẾN SỰ HÀI LÒNG CỦA NGƯỜI DÙNG
                    </h1>

                    <h3>LĨNH VỰC: KHOA HỌC XÃ HỘI HÀNH VI</h3>
                </div>

                {/* ===== DEMO SẢN PHẨM ===== */}
                <div className={styles.demoProduction}>
                    <h2>GIỚI THIỆU SẢN PHẨM </h2>
                    <img src={pageHome} alt="" className={styles.pageHome} />
                    <div className={styles.different}>
                        <h3>SỰ KHÁC BIỆT</h3>
                        <span>
                            AGiLand đổi mới cách tiếp cận thông tin du lịch
                            thông qua trải nghiệm tương tác.
                        </span>
                        <span>
                            Thay vì cung cấp thông tin tĩnh như các website
                            truyền thống, AGiLand tích hợp bản đồ tương tác và
                            nhiều chức năng trong một nền tảng thống nhất.
                        </span>
                        <span>
                            Điều này giúp người dùng dễ dàng khám phá, tăng tính
                            trực quan và nâng cao mức độ hài lòng.
                        </span>
                    </div>
                </div>

                {/* ===== KẾT QUẢ NGHIÊN CỨU ===== */}
                <div className={styles.kq}>
                    <h3>Kết quả nghiên cứu</h3>
                    <p>
                        Kết quả khảo sát cho thấy AGILAND có tác động tích cực
                        đến mức độ hài lòng và ý định sử dụng của người dùng.
                    </p>
                </div>
            </div>
        </div>
    );
}
