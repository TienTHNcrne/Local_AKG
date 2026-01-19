import React from "react";
import styles from "./Test.module.scss";

export default function Test() {
    const images = {
        pageHome: new URL("../../assets/poster/pagehome.png", import.meta.url)
            .href,
        weatherInformation: new URL(
            "../../assets/poster/WeatherInformation.png",
            import.meta.url,
        ).href,
        qr: new URL("../../assets/poster/QR.png", import.meta.url).href,
        simpleInformation: new URL(
            "../../assets/poster/SimpleInformation.png",
            import.meta.url,
        ).href,
        createRoute: new URL(
            "../../assets/poster/CreateRoute.png",
            import.meta.url,
        ).href,
        createTourist: new URL(
            "../../assets/poster/CreateTourist.png",
            import.meta.url,
        ).href,
    };

    const features = [
        {
            img: images.simpleInformation,
            title: "Thông tin điểm du lịch",
            desc: "Cung cấp thông tin chi tiết về các điểm du lịch",
        },
        {
            img: images.weatherInformation,
            title: "Thông tin thời tiết",
            desc: "Dự báo thời tiết theo khu vực",
        },
        {
            img: images.createRoute,
            title: "Tạo tuyến đường",
            desc: "Thiết kế tuyến đường",
        },
        {
            img: images.createTourist,
            title: "Tạo hành trình du lịch",
            desc: "Tạo hành trình du lịch tối ưu theo số ngày, ngân sách và địa điểm mong muốn.",
        },
    ];

    const differences = [
        {
            title: "Bản đồ tương tác thông minh",
            description:
                "Giúp người dùng khám phá An Giang theo không gian thực tế, hiển thị trực quan các điểm du lịch, làng nghề và lễ hội.",
        },
        {
            title: "Tích hợp AI",
            description:
                "Hỗ trợ gợi ý lịch trình, tư vấn địa điểm theo sở thích và ngân sách, đồng thời giải đáp thông tin về văn hóa, ẩm thực và du lịch An Giang 24/24.",
        },
        {
            title: "Tạo tuyến đường tối ưu",
            description:
                "AI tự động lập lộ trình giữa các điểm tham quan, giúp người dùng dễ dàng định hướng và di chuyển.",
        },
        {
            title: "Cộng đồng đóng góp nội dung",
            description:
                "Người dùng có thể chia sẻ bài viết, hình ảnh, thêm địa điểm và món ăn mới, tạo nên bản đồ văn hóa mở — khác với các website truyền thống chỉ cung cấp thông tin một chiều.",
        },
    ];

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
                        <div className={styles.titledemo}>
                            <img src={images.qr} alt="" className={styles.qr} />
                            <h2>GIỚI THIỆU SẢN PHẨM</h2>
                        </div>{" "}
                        <div className={styles.row1}>
                            <img
                                src={images.pageHome}
                                alt="Giao diện trang chủ AGiLand"
                                className={styles.pageHome}
                            />{" "}
                            <div className={styles.FunctionWeb}>
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={styles.featureCard}
                                    >
                                        <img
                                            src={feature.img}
                                            alt={feature.title}
                                        />
                                        <h4>{feature.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== KẾT QUẢ NGHIÊN CỨU ===== */}
                    <div className={styles.kq}>
                        <h2>Kết quả nghiên cứu</h2>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Recusandae cumque cum reprehenderit quod
                            voluptatum dolore repudiandae velit vel, quae
                            laudantium sit minus enim amet voluptates ipsum
                            quibusdam? Dignissimos, cumque maxime! Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Optio
                            doloremque non atque eveniet! Commodi earum natus
                            animi mollitia optio tempore esse repellat eius quia
                            nulla iste, assumenda blanditiis vero veniam.
                        </p>
                    </div>
            </div>
        </div>
    );
}
